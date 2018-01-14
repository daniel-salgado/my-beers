import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const toolbar = (props) => (

    //<Navbar inverse collapseOnSelect>
    <Navbar>
        <Navbar.Header>
            <LinkContainer to="/">
                <Navbar.Brand>
                    My Beers
                        </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/MyBeers">
                    <NavItem eventKey={1}>
                        My Beer List
                            </NavItem>
                </LinkContainer>
                <LinkContainer to="/NewBeer">
                    <NavItem eventKey={2} onClick={props.newBeer}>
                        New Beer
                            </NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    My Name
                        </NavItem>
                <NavItem eventKey={2} href="#">
                    Sign in/Sign out
                        </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

);

export default toolbar;