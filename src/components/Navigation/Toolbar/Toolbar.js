import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

const toolbar = (props) => {

    let user = null;
    let navItemUser = null;

    if (props.user !== null && props.user !== undefined) {

        user = props.user;

        navItemUser = (
            <NavItem eventKey={1}>{user.name}</NavItem>
        );

    }

    return (
        //<Navbar inverse collapseOnSelect>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    My Beers
            </Navbar.Brand>

                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1}>My Beer List</NavItem>
                    <NavItem eventKey={2} onClick={props.newBeer}>New Beer</NavItem>
                </Nav>
                <Nav pullRight>
                    {navItemUser}

                    <NavItem eventKey={2} onClick={props.logOut}>Sign in/Sign out</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);

};

export default toolbar;