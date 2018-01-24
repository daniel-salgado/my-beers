//Custom component Rater: https://github.com/NdYAG/react-rater
//http://react-component.github.io/rate/

//https://github.com/voronianski/react-star-rating-component
//https://www.npmjs.com/package/react-star-ratings
//https://www.npmjs.com/package/react-rater-plus //Does not work

import React, { Component } from 'react';
import './BeerDetails.css'
import { base, ref } from '../../../database/Database';


import StarRatings from 'react-star-ratings'

class BeerDetails extends Component {

    state = { myRating: 0 };

    componentWillMount() {
        this.setState({ myRating: this.props.myRating });
    }


    render() {

        const tableInstance = (
            <div className="BeerDetails"
                onClick={this.props.beerClicked}>
                <div className="beer-img">
                    <img src={this.props.image === null ? "http://via.placeholder.com/100x150" : this.props.image} alt={this.props.name} height="150px" />
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

                </div>
            </div>
        );


        return (tableInstance);
    }
};

export default BeerDetails;
