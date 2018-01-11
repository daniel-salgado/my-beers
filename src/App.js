import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
//To make the  bootstrap works
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
