import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import BeerRating from '../../containers/BeerRating/BeerRating'
import Welcome from '../../containers/Welcome/Welcome';

const layout = (props) => (

    <Router>
        <div>
            <Toolbar />
            <Route exact path="/" component={Welcome} />
            <Route path="/MyBeers" component={BeerRating} />
        </div>
    </Router>

);

export default layout;

/*<main className="Content">
{props.children}
</main>*/