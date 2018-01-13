import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const dialog = (props) => (

    <div>

        <Modal show={props.show} onHide={props.modalClosed}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.modalClosed}>Close</Button>
            </Modal.Footer>
        </Modal>

    </div>

);


export default dialog;