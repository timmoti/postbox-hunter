import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
// import SearchBar from './components/search-bar/SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        {/* <h1>Where To Mail</h1> */}
        {/* <SearchBar /> */}
        <MapContainer />
      </div>
    );
  }
}

export default App;
