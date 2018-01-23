import React, { Component } from 'react';
import Beer from './Beer/Beer';
import './Beers.css';

class Beers extends Component {

    render() {

        //console.log('[Beers.js]', this.props);

        const beers = this.props.listOfBeers.map((beer, index) => {

            return <Beer
                key={beer.id}
                name={beer.name}
                brewedBy={beer.brewedBy}
                style={beer.style}
                comment={beer.comment}
                image={beer.image}
                myRating={beer.myRating}
                beerClicked={() => this.props.clicked(index)}
            />
        });

        return (
            <div className="Beers">
                {beers}
            </div>
        );

    }

};

export default Beers;
