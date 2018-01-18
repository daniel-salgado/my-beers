import React, { Component } from 'react';
import { base, app } from './database/Database';

import './App.css';
//To make the  bootstrap works
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import BeerRating from './containers/BeerRating/BeerRating';
import Login from './containers/Auth/Login';

class App extends Component {

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

    let mainContent = null;

    if (this.state.authenticated && !this.state.loading) {
      mainContent = (<BeerRating user={this.state.user} />);
    }
    else {
      mainContent = (<Login />);
    }

    return (
      <div className="App">
        <div>
          <Toolbar logOut={() => this.userLogoutHnadler()} user={this.state.user} />
          {mainContent}
        </div>
      </div>
    );

  }

}

export default App;
