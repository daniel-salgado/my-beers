import React, { Component } from 'react';
import './BeerRating.css'
import Dialog from '../../components/UI/Modal/Dialog';
import { Modal, Button } from 'react-bootstrap';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import Welcome from '../../containers/Welcome/Welcome';
import NewBeer from '../../components/Beers/NewBeer/NewBeer';
import Beers from '../../components/Beers/Beers';


class BeerRating extends Component {

    state = {
        listOfBeers: [
            {
                id: 1
                , name: 'Amstel'
                , brewedBy: 'Amstel Brewery'
                , style: 'American-Style Lager'
                , description: 'No description available'
                , image: 'http://www.dbexportbeer.co.nz/DBExport/media/DB-Export/Our%20Beer/Export%20Gold/export-gold-bottle.png'
            },
            { id: 2, name: 'Han Shot First', brewedBy: 'Evil Genius Beer Company', style: 'Imperial or Double India Pale Ale', description: 'No description available', image: null },
            { id: 3, name: 'Hellion', brewedBy: 'Gigantic Brewing Company', style: 'Other Belgian-Style Ales', description: 'No description available', image: null },
            { id: 4, name: 'Iron Maiden Trooper', brewedBy: 'Robinsons Brewery', style: 'Classic English-Style Pale Ale', description: 'No description available', image: null },
            { id: 5, name: '666 Aged Ale', brewedBy: 'Diamond Knot Brewery & Alehouse', style: 'Wood- and Barrel-Aged Beer', description: 'No description available', image: null },
        ],
        newBeer: [{
            id: null,
            name: null
            , brewedBy: null
            , style: null
            , description: null
            , image: null
        }],
        addingNewBeer: false
    }


    //#region Handlers

    addBeerHandler = () => {

        console.log('[BeerRating.js addBeerHandler()] ');

        let addingNewBeer = true;

        this.setState({ addingNewBeer: addingNewBeer });

        addingNewBeer = false;

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

    //#endregion

    render() {


        console.log('[BeerRating.js] render()', this.state);

        return (

            <div>

                <Router>
                    <div>
                        <Toolbar />
                        <Route exact path="/" component={Welcome} />
                        <Route path="/MyBeers" render={() => <Beers listOfBeers={this.state.listOfBeers} />} />
                        <Route
                            path="/NewBeer"
                            render={
                                (event) => <NewBeer
                                    listOfBeers={this.state.listOfBeers}
                                    addBeerClick={this.addBeerHandler}
                                    newBeer={this.state.newBeer}
                                />
                            }
                        />
                    </div>
                </Router>

            </div>
        );

    };

};

export default BeerRating;
