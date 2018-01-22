//http://api.brewerydb.com/v2/beers?key={a9ed838cd8af37e4de8b097e850f964d}
import React, { Component } from 'react';
import { base, ref } from '../../../database/Database';


import { Form, Col, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { isArray } from 'util';

class NewBeer extends Component {

    state = {
        beerStyles: [],
        isLoading: true,
        options: [],
        style: '',
    }


    //#region Component Lifecycle

    componentWillMount() {

        this.setState({ isLoading: true });

        this.getBeerStyles();

    }
    //#endregion Component Lifecycle

    //#region Event Handler

    onChange = (e) => {

        /*
                // Because we named the inputs to match their corresponding values in state, it's
                // super easy to update the state
                const state = this.state
                state[e.target.name] = e.target.value;
                this.setState(state);
        */

        const newBeer = this.props.newBeer;

        if (e.target === undefined) {
            console.log('onChange', e);
            newBeer["style"] = e;
        } else {
            newBeer[e.target.name] = e.target.value;
            console.log('onChange', e.target.name, e.target.value);

        }

    }

    onInputChange = (event) => {

        console.log('onInputChange', event);

    }

    //#endregion Event Handler

    //#region Methods Handler

    getBeerStyles() {

        //Check if the user already exists
        base.fetch('beersCatalog/styles', {
            context: this,
            asArray: true //Will return the object
        }).then(data => {

            //console.log('[NewBeer.js] getBeerStyles()');
            //console.table(data);

            if (data.length > 0) {
                this.setState({ beerStyles: data });
            }

        }).catch(error => {/*handle error*/ });

        this.setState({ isLoading: false });

    }



    render() {

        //console.log('[NewBeer.js render()] ', this.state.beerStyles);

        return (
            <Form horizontal >

                <FormGroup controlId="beerName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Beer Name:
                    </Col>
                    <Col sm={4}>
                        <AsyncTypeahead
                            isLoading={this.state.isLoading}
                            labelKey="name"
                            placeholder="Name of the beer"
                            //value={this.props.newBeer.style}
                            onInputChange={
                                changedTxt => {
                                    const newBeer = this.props.newBeer;
                                    newBeer["name"] = changedTxt;
                                }
                            }
                            onChange={
                                changedTxt => {

                                    if (isArray(changedTxt)) {
                                        //this.props.newBeer.brewedBy = changedTxt[0].style.name;
                                        //console.log(this.props.newBeer.brewedBy);


                                        if (changedTxt[0] !== undefined) {



                                            const style = changedTxt[0].style.name;
                                            console.log(style);

                                            this.setState({ style: style });
                                            console.log(this.state.style);
                                        }
                                    }

                                }
                            }

                            options={this.state.options}

                            onSearch={query => {

                                let result = null;
                                this.setState({ isLoading: true });

                                const apiURL = 'https://api.brewerydb.com/v2/search?';
                                const queryString = "q=" + query;
                                const type = "&type=beer";
                                const key = "&key=a9ed838cd8af37e4de8b097e850f964d";
                                const format = "&format=json";

                                const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                                const targetUrl = apiURL + queryString + type + key + format;

                                //NO-CORS issue resolved by porxyUrl
                                //https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
                                fetch(proxyUrl + targetUrl)
                                    .then(result => result.json())
                                    .then(json => {
                                        result = json.data;

                                        if (isArray(result)) {
                                            this.setState({ options: result, isLoading: false });
                                        }

                                    })
                                    .catch(e => {
                                        console.log(e);
                                        return e;
                                    });

                            }}

                        />
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
                            placeholder="Brewery"
                            onChange={this.onChange}

                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="beerStyle">
                    <Col componentClass={ControlLabel} sm={2}>
                        Style
			        </Col>
                    <Col sm={4}>
                        <InputGroup>
                            <Typeahead
                                labelKey="name"
                                multiple={false}
                                options={this.state.beerStyles}
                                placeholder="Choose a style..."
                                //onInputChange={this.onChange}
                                value={this.state.style}
                            />
                            <InputGroup.Addon>
                                <Glyphicon glyph="list" />
                            </InputGroup.Addon>
                        </InputGroup>
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
                            value={this.props.newBeer.description}
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

            </Form>
        );

    };

}

export default NewBeer



/*


                <FormGroup controlId="beerName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Beer Name:
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


                */