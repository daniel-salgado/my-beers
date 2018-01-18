import React, { Component } from 'react';
import './BeerRating.css'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import NewBeer from '../../components/Beers/NewBeer/NewBeer';
import Beers from '../../components/Beers/Beers';
import { Button } from 'react-bootstrap';
import Dialog from '../../components/UI/Modal/Dialog';
import Beer from '../../components/Beers/Beer/Beer';
import { base } from '../../database/Database';


class BeerRating extends Component {

    state = {
        /*listOfBeers: [
            {
                id: 1
                , name: 'Amstel'
                , brewedBy: 'Amstel Brewery'
                , style: 'American-Style Lager'
                , description: 'No description available'
                , image: 'http://www.dbexportbeer.co.nz/DBExport/media/DB-Export/Our%20Beer/Export%20Gold/export-gold-bottle.png'
            },
            {
                id: 2,
                name: 'Han Shot First',
                brewedBy: 'Evil Genius Beer Company',
                style: 'Imperial or Double India Pale Ale',
                description: 'No description available',
                image: null
            },
            {
                id: 3,
                name: 'Hellion',
                brewedBy: 'Gigantic Brewing Company',
                style: 'Other Belgian-Style Ales',
                description: 'No description available',
                image: null
            },
            {
                id: 4,
                name: 'Iron Maiden Trooper',
                brewedBy: 'Robinsons Brewery',
                style: 'Classic English-Style Pale Ale',
                description: 'No description available',
                image: null
            },
            {
                id: 5,
                name: '666 Aged Ale',
                brewedBy: 'Diamond Knot Brewery & Alehouse',
                style: 'Wood- and Barrel-Aged Beer',
                description: 'No description available',
                image: null
            },
        
    ],*/
        listOfBeers: [],
        newBeer: {
            id: null,
            name: null
            , brewedBy: null
            , style: null
            , description: null
            , image: null
            , addedBy: null
        },
        addingNewBeer: false,
        showBeerDetail: false,
        modal: {
            title: null,
            body: null,
        }
    }


    //#region Handlers

    cleanNewBeerState() {

        let newBeer = [...this.state.newBeer];

        newBeer.id = null;
        newBeer.name = null;
        newBeer.brewedBy = null;
        newBeer.style = null;
        newBeer.description = null;
        newBeer.image = null;
        newBeer.addedBy=null;

        this.setState({ newBeer: newBeer, addingNewBeer: false });

        //console.log('[BeerRating.js cleanNewBeerState()] ', newBeer);

    }

    showAddBeerFormHandler = () => {
        this.setState({ addingNewBeer: true });
    }


    getMyBeersHandler() {

        console.log('Will get beers');

        /*Database.fetch('persons', {
          context: this,
          asArray: true,
          then(data) {
            console.log(data);
          }
        });*/

        const who = 'beers';

        base.fetch(who, {
            context: this, asArray: true
        }).then(data => {
            console.table(data);
        }).catch(error => {/*handle error*/ });


    }

    addBeerHandler = () => {

        this.setState({ addingNewBeer: true });

        let newBeer = [...this.state.newBeer];

        newBeer.id = [...this.state.listOfBeers].length + 1;
        newBeer.name = this.state.newBeer.name;
        newBeer.brewedBy = this.state.newBeer.brewedBy;
        newBeer.style = this.state.newBeer.style;
        newBeer.description = this.state.newBeer.description;
        newBeer.image = null;
        newBeer.addedBy = this.props.user.uid;

        //console.log('[BeerRating.js addBeerHandler()] ', newBeer);

        const listOfBeers = [...this.state.listOfBeers];

        listOfBeers.push(newBeer);

        this.setState({ listOfBeers: listOfBeers });

        this.cleanNewBeerState();

        //console.log('[BeerRating.js addBeerHandler()] ', newBeer);


        var immediatelyAvailableReference = base.push('beers', {
            data: { ...newBeer },
            then(err) {
                if (!err) {
                    console.log(err);
                }
            }
        });

        //available immediately, you don't have to wait for the callback to be called
        var generatedKey = immediatelyAvailableReference.key;

    }

    hideModalHandler = () => {
        this.setState({ showBeerDetail: false, addingNewBeer: false })

    }

    showBeerDetailsHandler = (beerIndex) => {

        //console.log('[BeerRating.js] showBeerDetailsHandler() index:', beerIndex);

        this.setState({ showBeerDetail: true })

        const beer = { ...this.state.listOfBeers[beerIndex] };

        //console.log('[BeerRating.js] showBeerDetailsHandler() index:', beer);

        const modal = {
            title: beer.name,
            body: (
                <Beer
                    key={beer.id}
                    name={beer.name}
                    brewedBy={beer.brewedBy}
                    style={beer.style}
                    description={beer.description}
                    image={beer.image}
                    addedBy={beer.addedBy}
                />
            ),
        };

        this.setState({ modal: modal });

    };

    deleteBeerHandler = (beerIndex) => {

        //const persons = this.state.persons.slice(); //Copy the original array or
        const listOfBeers = [...this.state.listOfBeers];
        listOfBeers.splice(beerIndex, 1);
        this.setState({ listOfBeers: listOfBeers });

    }

    //#endregion

    render() {

        console.log('[BeerRating.js] render()', this.props.user);

        const beers = (<Beers listOfBeers={this.state.listOfBeers} clicked={this.showBeerDetailsHandler} />);
        let newBeer = null;
        let modal = null;

        /*
            I had to disable this verification because the fade-out animation stoped to work
            This animation is based on the bootstrap component (Dialog) and when it does not exist,
            the animation simply does not play.
            The same hapens to the components newBeer and showBeerDatails
        */
        //if (this.state.addingNewBeer) {

        newBeer = (

            <Dialog
                show={this.state.addingNewBeer}
                modalClosed={this.hideModalHandler}
                submit={this.addBeerHandler}
                title="New beer"
                cancelCaption="Close"
                submitCaption="Save"
            >

                <NewBeer
                    newBeer={this.state.newBeer}
                    clicked={this.addBeerHandler}
                />

            </Dialog>

        );

        modal = (
            <Dialog
                show={this.state.showBeerDetail}
                modalClosed={this.hideModalHandler}
                title={this.state.modal.title}
                cancelCaption="Close"
            >
                {this.state.modal.body}
            </Dialog>
        );

        return (

            <div>
                <Button onClick={this.showAddBeerFormHandler}>Add beer</Button>
                <hr />
                {newBeer}
                {beers}
                {modal}
            </div>

        );

    };

};

export default BeerRating;
