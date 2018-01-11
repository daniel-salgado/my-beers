import React, { Component } from 'react';

import { Form, Col, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';


class NewBeer extends Component {


    state = {
        beerName: null,
        brewedBy: null,
        beerStyle: null,
        beerDescription: null,
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);


        this.props.NewBeer = this.state;

        console.log('[NewBeer.js onChange()] ', this.state);

    }


    render() {

        const x = this.props;

        console.log('[NewBeer.js render()] ', this.props);

        return (
            <Form horizontal>

                <FormGroup controlId="beerName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Beer
                    </Col>
                    <Col sm={4}>
                        <FormControl
                            type="text"
                            name="txtBeerName"
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
                        <FormControl type="text" placeholder="Brewed by..." />
                    </Col>
                </FormGroup>

                <FormGroup controlId="beerStyle">
                    <Col componentClass={ControlLabel} sm={2}>
                        Style
			        </Col>
                    <Col sm={4}>
                        <FormControl type="text" placeholder="Beer style" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="beerDescription">
                    <Col componentClass={ControlLabel} sm={2}>
                        Description
        			</Col>
                    <Col sm={4}>
                        <FormControl type="textarea" placeholder="Description...." />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={4}>
                        <Button type="submit" onClick={this.props.addBeerClick} >Save</Button>
                    </Col>
                </FormGroup>

            </Form>
        );

    };

}

export default NewBeer