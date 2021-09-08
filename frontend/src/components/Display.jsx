import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { url } from './api';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomerModal from './CustomerModal';
import EmployeeModal from './EmployeeModal';
import Button from 'react-bootstrap/Button';
import AddComplaintModal from "./AddComplaintModal";

const ComplaintContainer = styled.span`
    height: 230px;
    width: 45%;
    margin: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    background: ${({completed}) => 
    completed ? '#bbff99' : '#ffffad'
    };

    display: block;
`

const ButtonBox = styled.div`
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
`

const ComplaintTitle = styled.div`
    width: 100%;
    padding-bottom: 5px;
    text-align: center;
`

const ComplaintBox = styled.div`
    width: 100%;
    justify-content: space-evenly;
`

const ComplaintSection = styled.span`
    width: 40%;
    display: inline-block;
`

export default function Display({user, setUser}) {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        getComplaints();
    }, []);

    async function handleLogout() {
        setUser(null);
        axios.get(url + '/user/logout');
        toast("Logged out");
    }

    async function createComplaint() {
        console.log("Why you complaining");
    }

    async function getComplaints() {
        let uri;
        if(user.employee){
            uri = "/complaint/all";
        } else {
            uri = "/complaint/user/" + user.id;
        }

        axios.get(url + uri)
        .then((response) => {
            setComplaints(response.data);
        });
    }

    return (
        <>
            <ButtonBox>
                <Button onClick={handleLogout}>Logout</Button>
                {user.employee || <AddComplaintModal user={user} getComplaints={getComplaints}/>}
            </ButtonBox>
            {complaints.map(complaint => (
            <ComplaintContainer completed={complaint.solution}>
                <ComplaintTitle>
                    <h3>{complaint.title}</h3>
                </ComplaintTitle>
                <ComplaintBox>
                    <ComplaintSection>
                        Complaint: {complaint.body}
                    </ComplaintSection>
                    <ComplaintSection>
                        {complaint.solution
                            ? <p>Solution: {complaint.solution}</p>
                            : <p>Waiting for feedback</p>}
                    </ComplaintSection>
                </ComplaintBox>
                {user.employee 
                ? <EmployeeModal complaint={complaint} getComplaints={getComplaints}/>
                : <CustomerModal complaint={complaint} getComplaints={getComplaints}/>}
            </ComplaintContainer>
            ))}
        </>
    );
}