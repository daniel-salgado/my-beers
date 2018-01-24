import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const toolbar = (props) => {

    let user = null;
    let dropdownUser = null;

    if (props.user !== null && props.user !== undefined) {

        user = props.user;
 
        dropdownUser = (
            <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>My account</MenuItem>
                
                <MenuItem divider />
                <MenuItem eventKey={3.4} onClick={props.logOut}>Sign Out</MenuItem>
            </NavDropdown>
        );

    }

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    My Beers
            </Navbar.Brand>

                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} onClick={props.listBeerClicked}>My Beer List</NavItem>
                    <NavItem eventKey={2} onClick={props.addBeer}>Check-in New Beer</NavItem>
                </Nav>
                <Nav pullRight>
                    {dropdownUser}
                </Nav>
            </Navbar.Collapse>
        </Navbar>);

};

export default toolbar;