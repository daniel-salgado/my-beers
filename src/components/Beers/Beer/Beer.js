import React from 'react';
import './Beer.css'

const beer = (props) => {

    const tableInstance = (
        <div className="Beer"
            onClick={props.beerClicked}>
            <div className="beer-img">
                <img src={props.image === null ? "http://via.placeholder.com/100x150" : props.image} alt={props.name} height="150px" />
            </div>
            <div className="beer-desc">
                <h2>{props.name}</h2>
                <p>{props.description}</p>
                <p><strong>Brewed By: </strong>{props.brewedBy}</p>
                <p><strong>Style: </strong>{props.style}</p>
                
            </div>
        </div>
    );

    //console.log('[Beer.js]', props);

    return (tableInstance);
};

export default beer;

