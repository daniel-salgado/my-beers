//http://api.brewerydb.com/v2/beers?key={a9ed838cd8af37e4de8b097e850f964d}
//https://www.npmjs.com/package/react-datetime

import React, { Component } from 'react';
import { base, ref } from '../../../database/Database';


import { Form, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { isArray } from 'util';
import StarRatings from 'react-star-ratings';

import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';


import beerPlaceHolder from '../../../assets/images/placeholder.png'
import './NewBeer.css';

class NewBeer extends Component {

    state = {
        beerStyles: [],
        isLoading: false,
        beerOptions: [],
        styleOptions: [],
        newBeer: {
            id: '',
            key: '',
            name: '',
            brewedBy: '',
            style: '',
            comment: '',
            image: '',
            addedBy: '',
            addedOn: '',
            myRating: 0,
            where: '',
            when: moment().format("D MMM YYYY"),
        },
        selectedStyle: [],
        formValidation: {
            name: null,
            brewedBy: null,
        },
        formIsValid: false,



    }


    //#region Component Lifecycle

    componentWillMount() {

        //this.setState({ isLoading: true });

        //this.getBeerStyles();

    }
    //#endregion Component Lifecycle

    //#region Event Handler

    changeStyleHandler = (event) => {

        console.log('[NewBeer.js] changeStyleHandler', event);

        const newBeer = { ...this.state.newBeer };

        newBeer.style = event.target.value;

        this.setState({ newBeer: newBeer });
    }

    changeBrewerHandler = (event) => {

        const newBeer = { ...this.state.newBeer };

        newBeer.brewedBy = event.target.value;

        this.setState({ newBeer: newBeer });
    }

    changeCommentHandler = (event) => {

        //console.log('[NewBeer.js] changeBrewerHandler', event.target.value);

        const newBeer = { ...this.state.newBeer };

        newBeer.comment = event.target.value;

        this.setState({ newBeer: newBeer });

    }

    changeWhereHandler = (event) => {

        //console.log('[NewBeer.js] changeBrewerHandler', event.target.value);

        const newBeer = { ...this.state.newBeer };

        newBeer.where = event.target.value;

        this.setState({ newBeer: newBeer });

    }

    cleanNewBeerState() {

        let newBeer = [...this.state.newBeer];

        newBeer.id = '';
        newBeer.name = '';
        newBeer.brewedBy = '';
        newBeer.style = '';
        newBeer.comment = '';
        newBeer.image = '';
        newBeer.addedBy = '';
        newBeer.addedOn = '';
        newBeer.myRating = 0;
        newBeer.where = '';
        newBeer.when = '';

        this.setState({ newBeer: newBeer });

        //this.props.addingNewBeer = false;
        //console.log('[BeerRating.js cleanNewBeerState()] ', newBeer);

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
                this.setState({ styleOptions: data });
            }

        }).catch(error => {/*handle error*/ });

        this.setState({ isLoading: false });

    }

    validFormHandler() {

        let formValidation = { ...this.state.formValidation };
        let formIsValid = true;

        if (this.state.newBeer.name.length > 0) {
            formValidation.name = "success";
        }
        else {
            formValidation.name = "error";
            formIsValid = false;
        }

        if (this.state.newBeer.brewedBy.length > 0) {
            formValidation.brewedBy = "success";
        }
        else {
            formValidation.brewedBy = "error";
            formIsValid = false;
        }

        if (this.state.newBeer.style.length > 0) {
            formValidation.style = "success";
        }
        else {
            formValidation.style = "error";
            formIsValid = false;
        }

        if (this.state.newBeer.comment.length > 0) {
            formValidation.comment = "success";
        }
        else {
            formValidation.comment = "error";
            formIsValid = false;
        }

        this.setState({ formValidation: formValidation, formIsValid: formIsValid });

    }

    addBeerHandler = () => {

        let isValid = true;

        this.setState({ addingNewBeer: true });

        //this.validFormHandler();

        let formValidation = { ...this.state.formValidation };

        if (this.state.newBeer.name.length > 0) {
            formValidation.name = "success";
        }
        else {
            formValidation.name = "error";
            isValid = false;
        }

        if (this.state.newBeer.brewedBy.length > 0) {
            formValidation.brewedBy = "success";
        }
        else {
            formValidation.brewedBy = "error";
            isValid = false;
        }

        if (this.state.newBeer.style.length > 0) {
            formValidation.style = "success";
        }
        else {
            formValidation.style = "error";
            isValid = false;
        }

        if (this.state.newBeer.comment.length > 0) {
            formValidation.comment = "success";
        }
        else {
            formValidation.comment = "error";
            isValid = false;
        }

        this.setState({ formValidation: formValidation });


        if (!isValid)
            return;

        //console.log(this.state.newBeer);

        let newBeer = [...this.state.newBeer];
        newBeer.id = this.state.newBeer.id;
        newBeer.name = this.state.newBeer.name;
        newBeer.brewedBy = this.state.newBeer.brewedBy;
        newBeer.style = this.state.newBeer.style;
        newBeer.comment = this.state.newBeer.comment;
        newBeer.image = this.state.newBeer.image;
        newBeer.addedBy = this.props.user.uid;
        newBeer.myRating = this.state.newBeer.myRating;
        newBeer.where = this.state.newBeer.where;
        newBeer.when = this.state.newBeer.when;
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

        //this.cleanNewBeerState();
        this.props.cancelButton();

    }

    //#endregion Methods Handler

    render() {

        //console.log('[NewBeer.js render()] ', this.state.newBeer);
        //console.table(this.state.newBeer);

        return (

            <div className="container NewBeer">
                <Col sm={8}>
                    <Form horizontal >

                        <FormGroup controlId="beerName" validationState={this.state.formValidation.name}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Name:
                            </Col>
                            <Col sm={10}>
                                <AsyncTypeahead
                                    isLoading={this.state.isLoading}
                                    labelKey="name"
                                    placeholder="Name of the beer"
                                    value={this.state.newBeer.name}
                                    onInputChange={
                                        changedTxt => {

                                            const newBeer = { ...this.state.newBeer };
                                            newBeer.name = changedTxt;
                                            this.setState({ newBeer: newBeer });

                                            //console.log(this.state.newBeer);

                                        }
                                    }
                                    onChange={
                                        changedTxt => {

                                            if (isArray(changedTxt)) {
                                                if (changedTxt[0] !== undefined) {

                                                    const newBeer = { ...this.state.newBeer };
                                                    newBeer.id = changedTxt[0].id;
                                                    newBeer.name = changedTxt[0].name;
                                                    newBeer.style = changedTxt[0].style.name;

                                                    if (changedTxt[0].labels !== undefined) {
                                                        newBeer.image = changedTxt[0].labels.medium;
                                                    }
                                                    else {
                                                        newBeer.image = null;
                                                    }

                                                    newBeer.brewedBy = changedTxt[0].breweries[0].name;

                                                    this.setState({ newBeer: newBeer });

                                                }
                                            }

                                        }
                                    }

                                    options={this.state.beerOptions}

                                    onSearch={query => {

                                        let result = null;
                                        this.setState({ isLoading: true });

                                        const apiURL = "https://api.brewerydb.com/v2/";
                                        const apiOperation = "search?";
                                        const queryString = "q=" + query;
                                        const type = "&type=beer";
                                        const withBreweries = "&withBreweries=Y";
                                        const key = "&key=a9ed838cd8af37e4de8b097e850f964d";
                                        const format = "&format=json";

                                        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                                        const targetUrl = apiURL + apiOperation + queryString + type + withBreweries + key + format;

                                        //NO-CORS issue resolved by porxyUrl
                                        //https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
                                        fetch(proxyUrl + targetUrl)
                                            .then(result => result.json())
                                            .then(json => {
                                                result = json.data;

                                                if (isArray(result)) {
                                                    this.setState({ beerOptions: result, isLoading: false });
                                                    console.table(result);
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

                        <FormGroup controlId="brewedBy" validationState={this.state.formValidation.brewedBy}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Brewed by
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    name="brewedBy"
                                    placeholder="Brewery"
                                    onChange={this.changeBrewerHandler}
                                    value={this.state.newBeer.brewedBy}

                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="beerStyle" validationState={this.state.formValidation.style}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Style
			                 </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Style..."
                                    onChange={this.changeStyleHandler}
                                    value={this.state.newBeer.style}
                                />

                            </Col>
                        </FormGroup>

                        <hr />

                        <FormGroup controlId="beerWhere">

                            <Col componentClass={ControlLabel} sm={2}>Where</Col>

                            <Col sm={10}>

                                <FormControl
                                    name="where"
                                    type="text"
                                    placeholder="Where?"
                                    value={this.state.newBeer.where}
                                    onChange={this.changeWhereHandler}

                                />

                            </Col>

                        </FormGroup>

                        <FormGroup controlId="beerRating">
                            <Col componentClass={ControlLabel} sm={2}>
                                Rating
                			</Col>
                            <Col sm={10} style={{ textAlign: 'left' }}>

                                <StarRatings
                                    rating={this.state.newBeer.myRating}
                                    isSelectable={true}
                                    isAggregateRating={false}
                                    changeRating={
                                        newRating => {

                                            const newBeer = { ...this.state.newBeer };

                                            if (newRating === newBeer.myRating)
                                                newBeer.myRating = 0;
                                            else
                                                newBeer.myRating = newRating;

                                            this.setState({ newBeer: newBeer });

                                        }
                                    }
                                    numOfStars={5}
                                    starWidthAndHeight={'20px'}
                                    starRatedColor="gold"
                                    starSelectingHoverColor="gold"//"rgb(220, 209, 41)"
                                    starEmptyColor="rgb(104,104,104)"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="beerComment" validationState={this.state.formValidation.comment}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Comment
                			</Col>
                            <Col sm={10}>

                                <FormControl
                                    name="comment"
                                    placeholder="What do you think about this beer?"
                                    onChange={this.changeCommentHandler}
                                    value={this.state.newBeer.comment}
                                    rows={5}
                                    componentClass="textarea"
                                    style={{ resize: "none" }}
                                />

                            </Col>
                        </FormGroup>

                        <FormGroup controlId="beerButtons" style={{ textAlign: 'right' }}>
                            <Col smOffset={2} sm={10}>
                                <Button bsStyle="danger" onClick={this.props.cancelButton}>Cancel</Button>
                                <Button bsStyle="primary" onClick={this.addBeerHandler} style={{ marginLeft: '20px' }}>Save</Button>
                            </Col>
                        </FormGroup>

                    </Form>

                </Col>
                <Col sm={4}>
                    <img src={(this.state.newBeer.image === null || this.state.newBeer.image === '') ? beerPlaceHolder : this.state.newBeer.image} alt={this.state.newBeer.name} width="100%" />
                </Col>

            </div >

        );

    };

}

export default NewBeer
