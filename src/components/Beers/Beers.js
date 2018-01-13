import React, { Component } from 'react';
import Beer from './Beer/Beer';
import './Beers.css';

class Beers extends Component {

    render() {

        //console.log('[Beers.js]', this.props);

        return this.props.listOfBeers.map((beer, index) => {

            return <div className="Beers" key={beer.id}>
                    <Beer
                        key={beer.id}
                        name={beer.name}
                        brewedBy={beer.brewedBy}
                        style={beer.style}
                        description={beer.description}
                        image={beer.image}
                        beerClicked={() => this.props.clicked(index)}
                    />
            </div>

        });

    }

};

export default Beers;
