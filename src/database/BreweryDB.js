
import React from 'react';
import { hell } from '../database/Database';

const config = {
    apiKey: "a9ed838cd8af37e4de8b097e850f964d",
    apiURL: "http://api.brewerydb.com/v2/",

};


const saveBeersFromBrewedDB = (beers) => {

    console.log('[BreweryDB.js] saveBeersFromBrewedDB beers:', beers);

}




export { saveBeersFromBrewedDB }