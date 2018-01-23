//http://api.brewerydb.com/v2/beers?key={a9ed838cd8af37e4de8b097e850f964d}
import React, { Component } from 'react';
import { base, ref } from '../../../database/Database';


import { Form, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { isArray } from 'util';

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
            myRanting: '',
        },
        selectedStyle: [],
    }


    //#region Component Lifecycle

    componentWillMount() {

        //this.setState({ isLoading: true });

        //this.getBeerStyles();

    }
    //#endregion Component Lifecycle

    //#region Event Handler

    changeBrewerHandler = (event) => {

        //console.log('[NewBeer.js] changeBrewerHandler', event.target.value);

        const newBeer = { ...this.state.newBeer };

        newBeer.brewedBy = event.target.value;

        this.setState({ newBeer: newBeer });
    }

    changeStyleHandler = (value) => {

        console.log('[NewBeer.js] changeStyleHandler', value);

        const newBeer = { ...this.state.newBeer };

        newBeer.style = value;

        this.setState({ newBeer: newBeer });
    }

    changeBrewerHandler = (value) => {

        console.log('[NewBeer.js] changeStyleHandler', value);

        const newBeer = { ...this.state.newBeer };

        newBeer.brewedBy = value;

        this.setState({ newBeer: newBeer });
    }

    changeCommentHandler = (event) => {

        //console.log('[NewBeer.js] changeBrewerHandler', event.target.value);

        const newBeer = { ...this.state.newBeer };

        newBeer.comment = event.target.value;

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
        newBeer.myRanting = '';

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

    addBeerHandler = () => {

        this.setState({ addingNewBeer: true });

        //console.log(this.state.newBeer);

        let newBeer = [...this.state.newBeer];

        newBeer.name = this.state.newBeer.name;
        newBeer.brewedBy = this.state.newBeer.brewedBy;
        newBeer.style = this.state.newBeer.style;
        newBeer.comment = this.state.newBeer.comment;
        newBeer.image = this.state.newBeer.image;
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

        this.cleanNewBeerState();

    }

    render() {

        //console.log('[NewBeer.js render()] ', this.state.newBeer);
        //console.table(this.state.newBeer);

        return (


            <div className="container">
                <Col sm={8}>

                    <Form horizontal >

                        <FormGroup controlId="beerName">
                            <Col componentClass={ControlLabel} sm={2}>

                                Beer Name:
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

                                                    //console.log('passou por aqui');
                                                    //console.log(newBeer);
                                                    //console.log(this.state.newBeer);

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

                        <FormGroup controlId="brewedBy">
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

                        <FormGroup controlId="beerStyle">
                            <Col componentClass={ControlLabel} sm={2}>
                                Style
			        </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Style..."
                                    onChange={this.changeCommentHandler}
                                    value={this.state.newBeer.style}
                                />

                            </Col>
                        </FormGroup>

                        <FormGroup controlId="beerComment">
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

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button bsStyle="danger" onClick={this.props.cancelButton}>Cancel</Button>
                                <Button bsStyle="primary" onClick={this.addBeerHandler}>Save</Button>
                            </Col>
                        </FormGroup>

                    </Form>

                </Col>
                <Col sm={4}>
                    <img src={this.state.newBeer.image} width="100%" />
                </Col>

            </div>


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