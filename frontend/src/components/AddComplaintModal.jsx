import React, { useState } from "react";
import { url } from './api';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function AddComplaintModal({user, getComplaints}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();

    async function updateComplaint(data) {
        axios.post(url +'/complaint', {
          title: data.title,
          body: data.body,
          solution: null,
          poster: user
        }).then((response) => {
          getComplaints();
          handleClose();
        });
    }

    return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Add Complaint
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateComplaint)}>
        <input type="text" {...register("title")} placeholder="Title"/>
            <input type="text" {...register("body")} placeholder="Complaint"/>
            <input type='submit' value='Submit' />
        </form>
        </Modal.Body>
        
      </Modal>
    </>
    );
}