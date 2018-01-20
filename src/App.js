import React, { Component } from 'react';

import './App.css';
//To make the  bootstrap works
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import User from './containers/User/User';
import Welcome from './containers/Welcome/Welcome';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Welcome>
          <User />
        </Welcome>
      </div>
    );

  }

}

export default App;
