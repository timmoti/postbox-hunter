import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
// import SearchBar from './components/search-bar/SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        {/* <SearchBar /> */}
        <MapContainer />
      </div>
    );
  }
}

export default App;
