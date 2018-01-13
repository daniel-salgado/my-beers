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

        const newBeer = this.props.newBeer[0];

        newBeer[e.target.name] = e.target.value;

        console.log('[NewBeer.js onChange()] ', this.props);


    }

    onAddBeer = () => {

        const newBeerID = [...this.props.listOfBeers].length + 1;

        this.props.newBeer[0].id = newBeerID

        console.log('[NewBeer.js onAddBeer()] before push', this.props.newBeer[0]);

        this.props.listOfBeers.push(...this.props.newBeer[0]);

        console.log('[NewBeer.js onAddBeer()] after push', this.props.newBeer[0]);

    }


    render() {

        console.log('[NewBeer.js render()] ', this.props);

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
                            value={this.props.name}
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
                            value={this.props.name}
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
                            placeholder="Description...."
                            value={this.props.name}
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={4}>
                        <Button onClick={this.onAddBeer} >Save</Button>
                    </Col>
                </FormGroup>

            </Form>
        );

    };

}

export default NewBeer