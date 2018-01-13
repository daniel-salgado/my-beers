import React, { Component } from 'react';

import { Form, Col, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';


class NewBeer extends Component {

    onChange = (e) => {

        /*
                // Because we named the inputs to match their corresponding values in state, it's
                // super easy to update the state
                const state = this.state
                state[e.target.name] = e.target.value;
                this.setState(state);
        */
        console.log('[NewBeer.js onChange()] ', e.target.name, e.target.value);
        const newBeer = this.props.newBeer;

        newBeer[e.target.name] = e.target.value;

        console.log('[NewBeer.js onChange()] ', this.props);


    }

    onAddBeer = (newBeer) => {

        const newBeerID = [...this.props.listOfBeers].length + 1;

        this.props.newBeer.id = newBeerID

        console.log('[NewBeer.js onAddBeer()] this.props.newBeer[0]', this.props.newBeer);
        console.log('[NewBeer.js onAddBeer()] newBeer', newBeer);

        newBeer = [this.props.newBeer];

        console.log('[NewBeer.js onAddBeer()] this.props.newBeer[0]', this.props.newBeer);
        console.log('[NewBeer.js onAddBeer()] newBeer', newBeer);

    }


    render() {

        //console.log('[NewBeer.js render()] ', this.props);

        return (
            <Form horizontal >

                <FormGroup controlId="beerName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Beer
                    </Col>
                    <Col sm={4}>
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="Name of the beer"
                            value={this.props.name}
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="brewedBy">
                    <Col componentClass={ControlLabel} sm={2}>
                        Brewed by
                    </Col>
                    <Col sm={4}>
                        <FormControl
                            type="text"
                            name="brewedBy"
                            placeholder="Brewed by..."
                            value={this.props.brewedBy}
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="beerStyle">
                    <Col componentClass={ControlLabel} sm={2}>
                        Style
			        </Col>
                    <Col sm={4}>
                        <FormControl
                            type="text"
                            name="style"
                            placeholder="Beer style"
                            value={this.props.beerStyle}
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="beerDescription">
                    <Col componentClass={ControlLabel} sm={2}>
                        Description
        			</Col>
                    <Col sm={4}>
                        <FormControl
                            type="textarea"
                            name="description"
                            placeholder="Description..."
                            value={this.props.beerDescription}
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={4}>
                        <Button onClick={this.props.clicked}>Save</Button>
                    </Col>
                </FormGroup>

            </Form>
        );

    };

}

export default NewBeer