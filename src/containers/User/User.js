import React, { Component } from 'react';
import BeerRating from '../BeerRating/BeerRating';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
class User extends Component {

    render() {

        const beerRating = this.props.children;
        const user = (<h1>USER CLASS</h1>);

        return (

            <div>
                <Toolbar />
                {user}
                {beerRating}
            </div>

        );

    };

}

export default User;

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