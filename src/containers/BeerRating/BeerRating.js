import React, { Component } from 'react';
import './BeerRating.css'

import NewBeer from '../../components/Beers/NewBeer/NewBeer';
import Beers from '../../components/Beers/Beers';
import Dialog from '../../components/UI/Modal/Dialog';
import Beer from '../../components/Beers/Beer/Beer';
import BeerDetails from '../../components/Beers/BeerDetails/BeerDetails';
import { base } from '../../database/Database';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

//Temporary
import '../../App.css';


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
            id: '',
            key: '',
            name: '',
            brewedBy: '',
            style: '',
            comment: '',
            image: '',
            addedBy: '',
            addedOn: '',
            myRanting: ''
        },
        addingNewBeer: false,
        showBeerDetail: false,
        modal: {
            title: null,
            body: null,
        }
    }

    //#region Component Lifcycle

    componentWillMount() {

        const userKey = this.props.user.uid;

        //users from firebase//users from state
        this.beersRef = base.syncState('users/' + userKey + '/beers', {
            context: this,
            state: "listOfBeers",
            asArray: true,
            queries: {
                orderByChild: 'when',
            }
        });




    }

    componentWillUnmount() {
        base.removeBinding(this.beersRef);
    }

    //#endregion Component Lifcycle


    //#region Event Handlers



    //#endregion Event Handlers



    //#region Handlers


    showAddBeerFormHandler = () => {

        const addingNewBeer = !this.state.addingNewBeer;

        this.setState({ addingNewBeer: addingNewBeer });

        //console.log(this.state.addingNewBeer.toString());

    }

    hideModalHandler = () => {
        this.setState({ showBeerDetail: false, addingNewBeer: false })

    }

    showBeerDetailsHandler = (beerIndex) => {

        //console.log('[BeerRating.js] showBeerDetailsHandler() index:', beerIndex);

        this.setState({ showBeerDetail: true })

        const beer = { ...this.state.listOfBeers[beerIndex] };

        console.log('[BeerRating.js] showBeerDetailsHandler() index:', beer);

        const modal = {
            title: beer.name,
            body: (
                <BeerDetails
                    id={beer.key}
                    beerKey={beer.key}
                    name={beer.name}
                    brewedBy={beer.brewedBy}
                    style={beer.style}
                    comment={beer.comment}
                    image={beer.image}
                    addedBy={beer.addedBy}
                    myRating={beer.myRating}
                    user={this.props.user.uid}
                />
            ),
        };

        this.setState({ modal: modal });

    };

    /*
        updateBeerRating = (beerIndex, newRating) => {
    
            const key = user.uid;
    
            //Check if the user already exists
            base.fetch('users/' + user.uid, {
                context: this,
                asArray: false //Will return the object
            }).then(data => {
    
                //console.log('[Login.js] addUpdateUserHandler() uid', user.uid);
                //console.table(data);
    
                if (data.countLogs === null || data.countLogs === undefined) {
                    ref.child('users').child(key).set(loggedUser);
    
                } else {
    
                    loggedUser.countLogs = data.countLogs + 1;
                    ref.child('users').child(key).update(loggedUser);
    
                }
    
            }).catch(error => {/*handle error });
    
    
        }
    */
    //#endregion

    render() {

        //console.log('[BeerRating.js] render()', this.props.user);
        //this.getMyBeersHandler();

        const beers = (
            <Beers
                listOfBeers={this.state.listOfBeers}
                clicked={this.showBeerDetailsHandler}
                updateRating={false} />
        );

        let newBeer = null;

        if (this.state.addingNewBeer) {

            newBeer = (

                <NewBeer
                    newBeer={this.state.newBeer}
                    cancelButton={this.hideModalHandler}
                    user={this.props.user}
                    addingNewBeer={this.state.addingNewBeer}
                />

            );

        }

        const modal = (
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

            <div className="BeerRating">
                <Toolbar
                    logOut={this.props.logOut}
                    user={this.props.user}
                    addBeer={this.showAddBeerFormHandler}
                    listBeerClicked={this.hideModalHandler}
                />
                {newBeer}
                {beers}
                {modal}
            </div>

        );

    };

};

export default BeerRating;


/*

 const newBeer = (
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
                    user={this.props.user}
                    addingNewBeer={this.state.addingNewBeer}
                />

            </Dialog>
        );



*/