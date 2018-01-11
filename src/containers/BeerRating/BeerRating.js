import React, { Component } from 'react';
import Beers from '../../components/Beers/Beers';
import './BeerRating.css'
import Dialog from '../../components/UI/Modal/Dialog';
import { Modal, Button } from 'react-bootstrap';


class BeerRating extends Component {

    state = {
        listOfBeers: [
            { id: 1, name: 'Amstel', brewedBy: 'Amstel Brewery', style: 'American-Style Lager', description: 'No description available', image: 'http://www.dbexportbeer.co.nz/DBExport/media/DB-Export/Our%20Beer/Export%20Gold/export-gold-bottle.png' },
            { id: 2, name: 'Han Shot First', brewedBy: 'Evil Genius Beer Company', style: 'Imperial or Double India Pale Ale', description: 'No description available', image: null },
            { id: 3, name: 'Hellion', brewedBy: 'Gigantic Brewing Company', style: 'Other Belgian-Style Ales', description: 'No description available', image: null },
            { id: 4, name: 'Iron Maiden Trooper', brewedBy: 'Robinsons Brewery', style: 'Classic English-Style Pale Ale', description: 'No description available', image: null },
            { id: 5, name: '666 Aged Ale', brewedBy: 'Diamond Knot Brewery & Alehouse', style: 'Wood- and Barrel-Aged Beer', description: 'No description available', image: null },
        ],
    }

    addBeerHandler = () => {

        alert('addBeerHandler');

    }

    editBeerHandler = (beerIndex) => {

        const beer = this.state.listOfBeers[beerIndex];

        //alert('Hey! Clicou na beer ' + beer.name );
        //<Dialog showModal={true} />

    };

    deleteBeerHandler = (beerIndex) => {

        //const persons = this.state.persons.slice(); //Copy the original array or
        const listOfBeers = [...this.state.listOfBeers];
        listOfBeers.splice(beerIndex, 1);
        this.setState({ listOfBeers: listOfBeers });

    }

    render() {

        return (
            <div className="BeerRating">
            <button>hell</button>
                <Beers
                    clicked={this.editBeerHandler}
                    listOfBeers={this.state.listOfBeers} />
            </div>
        );

    };

};

export default BeerRating;