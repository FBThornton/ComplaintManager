import React, { useEffect, useState } from "react";
import styled from 'styled-components'
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
        console.log("complaning");
        complaint.body=data.body;
        axios.post(url +'/complaint/', {complaint}, {
            headers: {
              'Content-Type': 'application/json'
            }});
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
        // <div>
        //     <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#customerModal">Open Modal</button>

        //     <div id="customerModal" class="modal fade" role="dialog">
        //         <div class="modal-dialog">

                    
        //             <div class="modal-content">
        //                 <div class="modal-header">
        //                     <button type="button" class="close" data-dismiss="modal">&times;</button>
        //                     <h4 class="modal-title">Edit Complaint</h4>
        //                 </div>
        //                 <div class="modal-body">
        //                     
        //                 </div>
        //                 <div class="modal-footer">
        //                     <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        //                 </div>
        //             </div>

        //         </div>
        //     </div>
        // </div>
        

        );



}
