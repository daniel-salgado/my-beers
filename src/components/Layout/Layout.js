import React from 'react';
//
import './Layout.css';
import BeerRating from '../../containers/BeerRating/BeerRating'

const layout = (props) => (

    <BeerRating />

);

export default layout;

/*<main className="Content">
{props.children}
</main>*/

/*
    <Router>
        <div>
            <Toolbar />
            <Route exact path="/" component={Welcome} />
            <Route path="/MyBeers" component={BeerRating} />
            <Route path="/NewBeer" component={NewBeer} />
        </div>
    </Router>
    */