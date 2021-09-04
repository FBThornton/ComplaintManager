import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { url } from './api';
import axios from 'axios';
import { toast } from 'react-toastify';

const ComplaintContainer = styled.div`
    width: 60%;
    height: 240px;
    margin: 3%;
    text-align: center;
    border-radius: 8px;
    background: #e6e6e6;

    display: flex;
    flex-direction: column;
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
            uri = "/complaint/" + user.id;
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
            {complaints.map(complaint => (
            <ComplaintContainer>
                <h2>{complaint.title}</h2>
                <p>{complaint.body}</p>
                {complaint.solution
                    ? <p>Solution: {complaint.solution}</p>
                    : <p>Waiting for feedback</p>}
            </ComplaintContainer>
            ))}
        </>
    );
}