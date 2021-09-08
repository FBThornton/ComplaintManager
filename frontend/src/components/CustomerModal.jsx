import React, { useState } from "react";
import { url } from './api';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function CustomerModal({complaint}) {
    const [show, setShow] = useState(false);


    const [newComp, setComp] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    const { register, handleSubmit } = useForm();

    async function updateComplaint(data) {
        axios.put(url +'/complaint', {
          id: complaint.id,
          title: complaint.title,
          body: data.body,
          solution: complaint.solution,
          poster: complaint.poster
        });
    }

  
    return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateComplaint)}>
            <input type="text" {...register("body")} placeholder={complaint.body}/>
            <input type='submit' value='Submit' />
        </form>
        </Modal.Body>
        
      </Modal>
    </>
    );



}