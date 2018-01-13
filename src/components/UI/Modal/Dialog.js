import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const dialog = (props) => {



    return (
        <Modal show={props.show} onHide={props.modalClosed}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalClosed}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>

                {props.cancelCaption !== null && props.cancelCaption !== undefined ? (
                    <Button onClick={props.modalClosed}>{props.cancelCaption}</Button>
                ) : (
                        (null)
                    )}

                {props.submitCaption !== null && props.submitCaption !== undefined ? (
                    <Button onClick={props.submit}>{props.submitCaption}</Button>
                ) : (
                        (null)
                    )}





            </Modal.Footer>
        </Modal>
    );


};


export default dialog;