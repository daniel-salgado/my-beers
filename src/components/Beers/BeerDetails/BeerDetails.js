//Custom component Rater: https://github.com/NdYAG/react-rater
//http://react-component.github.io/rate/

//https://github.com/voronianski/react-star-rating-component
//https://www.npmjs.com/package/react-star-ratings
//https://www.npmjs.com/package/react-rater-plus //Does not work

import React, { Component } from 'react';
import './BeerDetails.css'
import { base, ref } from '../../../database/Database';
import { isArray } from 'util';

import StarRatings from 'react-star-ratings'

import beerImagePlaceHolder from '../../../assets/images/placeholder.png';

class BeerDetails extends Component {

    state = {
        myRating: 0,
        description: '',
    };

    componentWillMount() {
        this.setState({
            myRating: this.props.myRating
        });

        this.getBeerDetail();
    }

    getBeerDetail() {

        let result = null;

        const apiURL = "https://api.brewerydb.com/v2/";
        const apiOperation = "beer/" + this.props.id;
        const withBreweries = "?withBreweries=Y";
        const key = "&key=a9ed838cd8af37e4de8b097e850f964d";
        const format = "&format=json";

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = apiURL + apiOperation + withBreweries + key + format;

        //NO-CORS issue resolved by porxyUrl
        //https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        fetch(proxyUrl + targetUrl)
            .then(result => result.json())
            .then(json => {
                result = json.data;

                if (isArray(result)) {
                    //this.setState({ beerOptions: result, isLoading: false });
                    console.table(result);
                }

            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    render() {

        const tableInstance = (
            <div className="BeerDetails"
                onClick={this.props.beerClicked}>
                <div className="beer-img">
                    <img src={(this.props.image === null || this.props.image === undefined) ? beerImagePlaceHolder : this.props.image} alt={this.props.name} height="150px" />
                </div>
                <div className="beer-desc">
                    <h2>{this.props.name}<span> • {this.props.style}</span></h2>

                    <StarRatings
                        rating={this.state.myRating}
                        isSelectable={true}
                        isAggregateRating={false}
                        changeRating={
                            value => {

                                if (value === this.state.myRating)
                                    value = 0;

                                const userKey = this.props.user;
                                const beerKey = this.props.beerKey;

                                base.fetch('users/' + userKey + '/beers/' + beerKey, {
                                    context: this,
                                    asArray: false //Will return the object
                                }).then(data => {

                                    ref.child('users').child(userKey).child('beers').child(beerKey).child('myRating').set(value);

                                    this.setState({ myRating: value });


                                }).catch(error => {/*handle error*/ });

                            }
                        }
                        numOfStars={5}
                        starWidthAndHeight={'20px'}
                        starRatedColor="gold"
                        starSelectingHoverColor="gold"//"rgb(220, 209, 41)"
                    />

                    {(this.props.where === null || this.props.where === '' || this.props.where === undefined) ? null : (<p><strong>Where: </strong>{this.props.where}</p>)}
                    {(this.props.when === null || this.props.when === '' || this.props.when === undefined) ? null : (<p><strong>When: </strong>{this.props.when}</p>)}

                    <p>{this.props.comment}</p>

                    <hr />
                    <h3>Description</h3>

                    <p>{this.props.description}</p>



                </div>
            </div>
        );


        return (tableInstance);
    }
};

export default BeerDetails;
