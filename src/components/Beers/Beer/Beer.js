import React from 'react';
import './Beer.css'
import Dialog from '../../UI/Modal/Dialog';


const beer = (props) => {

    const tableInstance = (
        <div className="Beer"
            onClick={this.beerClicked}>
            <img src={props.image === null ? "http://via.placeholder.com/100x100" : props.image} alt={props.name} />
            <p><strong>Name: </strong>{props.name}</p>
            <p><strong>Brewed By: </strong>{props.brewedBy}</p>
            <p><strong>Style: </strong>{props.style}</p>
            <p><strong>Description: </strong>{props.description}</p>
        </div>
    );

    console.log('[Beer.js]', props);

    return (tableInstance);
};

export default beer;

