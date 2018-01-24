import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';


class RandomBeer extends Component {

    state = {
        beerInfo: null
    }

    getRandomBeer() {

        let beerInfo = null;

        const apiURL = "https://api.brewerydb.com/v2/";
        const apiOperation = "beer/random/?withBreweries=Y&hasLabels=Y";
        const key = "&key=a9ed838cd8af37e4de8b097e850f964d";
        const format = "&format=json";

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = apiURL + apiOperation + key + format;

        //NO-CORS issue resolved by porxyUrl
        //https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors

        fetch(proxyUrl + targetUrl)
            .then(beerInfo => beerInfo.json())
            .then(json => {
                beerInfo = json.data;
                this.setState({ beerInfo: beerInfo });
                console.log(beerInfo);
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }




    render() {


        
        let beerInfo = null;

        if (this.state.beerInfo !== null) {
            beerInfo = (
                <h2>{this.state.beerInfo.name}</h2>
            );
        }


        return (
            <div>
                {this.props.children}
            </div>
        );

    }
};

export default RandomBeer;

