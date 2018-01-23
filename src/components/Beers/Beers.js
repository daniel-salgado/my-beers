import React, { Component } from 'react';
import Beer from './Beer/Beer';
import './Beers.css';

class Beers extends Component {

    render() {

        //console.log('[Beers.js]', this.props);

        const beers = this.props.listOfBeers.map((beer, index) => {

            return <Beer
                key={beer.key}
                name={beer.name}
                brewedBy={beer.brewedBy}
                style={beer.style}
                comment={beer.comment}
                image={beer.image}
                myRating={beer.myRating}
                where={beer.where}
                when={beer.when}
                beerClicked={() => this.props.clicked(index)}
            />
        }).reverse();

        return (
            <div className="Beers">
                {beers}
            </div>
        );

    }

};

export default Beers;
