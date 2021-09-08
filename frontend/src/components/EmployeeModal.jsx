import React, { useState } from "react";
import { url } from './api';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function EmployeeModal({complaint, getComplaints}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();

    async function updateComplaint(data) {
        axios.put(url +'/complaint', {
          id: complaint.id,
          title: complaint.title,
          body: complaint.body,
          solution: data.solution,
          poster: complaint.poster
        });
        getComplaints();
    }

    return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Edit Solution
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Solution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateComplaint)}>
            <input type="text" {...register("solution")} placeholder={complaint.solution}/>
            <input type='submit' value='Submit' />
        </form>
        </Modal.Body>
        
      </Modal>
    </>
    );
}
