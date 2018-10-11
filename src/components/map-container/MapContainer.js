import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
// import data from '../data/mailing_locations.json';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      distanceFromCurrent: '300m away'
    };
  }

  onMapClick = () => {
    if (this.state.showInfoWindow === true) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showInfoWindow: true
    });
  };

  render() {
    // console.log(data);
    return (
      <Map
        item
        xs={12}
        centerAroundCurrentLocation
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={18}
        initialCenter={{ lat: 1.345819, lng: 103.838437 }}
      >
        <Marker position={{}} />
        <Marker
          onClick={this.onMarkerClick}
          title={'posting box'}
          position={{ lat: 1.24695, lng: 103.8389969 }}
          name={'current location'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          <Paper>
            <Typography variant="headline" component="h4">
              {this.state.selectedPlace.name}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {this.state.selectedPlace.title}
            </Typography>
            <Typography variant="headline" component="p">
              {this.state.distanceFromCurrent}
            </Typography>
          </Paper>
        </InfoWindow>
        {/* </CurrentLocation> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_API_KEY}`
})(MapContainer);
