//http://api.brewerydb.com/v2/beers?key={a9ed838cd8af37e4de8b097e850f964d}
import React, { Component } from 'react';
import { base, ref } from '../../../database/Database';


import { Form, Col, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { isArray } from 'util';

class NewBeer extends Component {

    state = {
        beerStyles: [],
        isLoading: true,
        options: [],
        newBeer: {
            id: '',
            key: '',
            name: '',
            brewedBy: '',
            style: '',
            description: '',
            image: '',
            addedBy: '',
            addedOn: '',
            myRanting: ''
        },
    }


    //#region Component Lifecycle

    componentWillMount() {

        this.setState({ isLoading: true });

        this.getBeerStyles();

    }
    //#endregion Component Lifecycle

    //#region Event Handler

    changeBrewerHandler = (event) => {

        console.log('[NewBeer.js] changeBrewerHandler', event.target.value);

        const newBeer = { ...this.state.newBeer };

        newBeer.brewedBy = event.target.value;

        this.setState({ newBeer: newBeer });
    }

    changeStyleHandler = (event) => {

        console.log('[NewBeer.js] changeStyleHandler', event.target.value);

        const newBeer = { ...this.state.newBeer };

        newBeer.style = event.target.value;

        this.setState({ newBeer: newBeer });
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

    addBeerHandler = () => {

        this.setState({ addingNewBeer: true });

        console.log(this.state.newBeer);

        let newBeer = [...this.state.newBeer];

        newBeer.name = this.state.newBeer.name;
        newBeer.brewedBy = this.state.newBeer.brewedBy;
        newBeer.style = this.state.newBeer.style;
        newBeer.description = this.state.newBeer.description;
        newBeer.image = null;
        newBeer.addedBy = this.props.user.uid;
        newBeer.myRanting = this.state.newBeer.myRanting;
        //newBeer.addedOn = Date.now();


        const immediatelyAvailableReference = base.push('users/' + newBeer.addedBy + '/beers', {
            data: { newBeer },
            then(err) {
                if (!err) {

                    newBeer.key = immediatelyAvailableReference.key;
                    ref.child('users/' + newBeer.addedBy + '/beers/' + newBeer.key).set(newBeer);
                    ref.child('beersCatalog/beers/' + newBeer.key).set(newBeer);

                }
            }
        });

    }



    render() {

        console.log('[NewBeer.js render()] ', this.state.newBeer);

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
                            value={this.state.newBeer.name}
                            onInputChange={
                                changedTxt => {

                                    const newBeer = this.state.newBeer;
                                    newBeer.name = changedTxt;
                                    console.log(this.state.newBeer);

                                }
                            }
                            onChange={
                                changedTxt => {

                                    if (isArray(changedTxt)) {
                                        if (changedTxt[0] !== undefined) {

                                            const newBeer = this.state.newBeer;
                                            newBeer.name = changedTxt[0].name;
                                            newBeer.style = changedTxt[0].style.name;

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
                            onChange={this.changeBrewerHandler}
                            value={this.state.newBeer.brewedBy}

                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="beerStyle">
                    <Col componentClass={ControlLabel} sm={2}>
                        Style
			        </Col>
                    <Col sm={4}>
                        <Typeahead
                            labelKey="name"
                            multiple={false}
                            options={this.state.options}
                            placeholder="Choose a style..."
                        //onInputChange={this.onChange}
                        //value={this.state.newBeer.style}
                        />

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
                            onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.addBeerHandler}>Vai</Button>
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