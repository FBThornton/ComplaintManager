import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { url } from './api';
import axios from 'axios';
import { toast } from 'react-toastify';

const ComplaintContainer = styled.span`
    height: 230px;
    width: 45%;
    margin: 3%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    background: ${({completed}) => 
    completed != null && '#bbff99' ||
    '#ffffad'
    };

    display: block;
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

    async function complaintConversion() {
        
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
            {
                // TODO conditional statement for adding complaint
            }
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
                <ComplaintBox>
                    {// TODO conditional statements for buttons to edit/update solution
                    }
                </ComplaintBox>
            </ComplaintContainer>
            ))}
        </>
    );
}