//Custom component Rater: https://github.com/NdYAG/react-rater
//http://react-component.github.io/rate/

//https://github.com/voronianski/react-star-rating-component
//https://www.npmjs.com/package/react-star-ratings
//https://www.npmjs.com/package/react-rater-plus //Does not work

import React from 'react';
import './Beer.css'

import StarRatings from 'react-star-ratings'

const beer = (props) => {

    const tableInstance = (
        <div className="Beer"
            onClick={props.beerClicked}>
            <div className="beer-img">
                <img src={props.image === null ? "http://via.placeholder.com/100x150" : props.image} alt={props.name} height="150px" />
            </div>
            <div className="beer-desc">
                <h2>{props.name}</h2>

                <StarRatings
                    rating={3}
                    isSelectable={true}
                    isAggregateRating={false}
                    //changeRating={this.changeRating}
                    numOfStars={5}
                    starWidthAndHeight={'20px'}
                    starRatedColor="gold"
                    starSelectingHoverColor="gold"//"rgb(220, 209, 41)"
                />

                <p>{props.comment}</p>
                <p><strong>Brewed By: </strong>{props.brewedBy}</p>
                <p><strong>Style: </strong>{props.style}</p>

            </div>
        </div>
    );

    //console.log('[Beer.js]', props);

    return (tableInstance);
};

export default beer;

