import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Dialog extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showModal: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>

                <div onClick={this.open}>
                    {this.props.children}
                </div>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.beer.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>



            </div>
        );
    }
}

export default Dialog;