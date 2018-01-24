import React, { Component } from 'react';
import BeerRating from '../BeerRating/BeerRating';
import { base, app } from '../../database/Database';
import Login from '../Auth/Login/Login';
import './User.css';
class User extends Component {

    state = {
        authenticated: false,
        user: null,
        loading: false
    };

    //#region Component Lifecycle

    componentWillMount() {

        //This listener is vital to get the logged user
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {

                const loggedUser = {
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                    photoURL: user.photoURL,
                    countLogs: 0,
                    uid: user.uid
                }

                this.setState({
                    authenticated: true,
                    loading: false,
                    user: loggedUser
                });


            }
            else {
                this.setState({
                    authenticated: false,
                    loading: false,
                    user: null
                });

            }
        })

        //console.log('[App.js] componentWillMount', this.state);

        /*this.songsRef = base.syncState('songs', {
          context: this,
          state: 'songs'
        });*/
    }

    componentWillUnmount() {
        base.removeBinding(this.personRef);
    }

    //#endregion Component Lifecycle 

    //#region Handlers and methods

    userLogoutHnadler() {
        app.auth().signOut().then((user, error) => {
            //this.setState({ authenticated: false })
            //console.log('[App.js] userLogoutHnadler()', this.state, user, error);

        });

        //console.log('[App.js] userLogoutHnadler()', this.state);

    }

    //#endregion Handlers and methods

    render() {

        let classes = "User";

        let mainContent = null;

        if (this.state.authenticated && !this.state.loading) {
            classes = "User UserLogged";
            mainContent = (<BeerRating user={this.state.user} logOut={() => this.userLogoutHnadler()} />);
        }
        else {
            mainContent = (<Login />);
        }

        return (
            <div className={classes}>
                {mainContent}
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