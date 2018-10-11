import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { makeCancelable } from './lib/cancelablePromise';
import data from './data/mailing_locations_list.json';
import bluedot from './images/Location_dot_blue.png';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: {},
      distanceFromCurrentLocation: ''
    };
  }

  componentDidMount = () => {
    if (navigator && navigator.geolocation) {
      this.geoPromise = makeCancelable(
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        })
      );

      this.geoPromise.promise.then(pos => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
  };

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
    return (
      <Map
        centerAroundCurrentLocation
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={18}
        initialCenter={{
          lat: 1.352866,
          lng: 103.816798
        }}
      >
        <Marker
          position={{
            lat: this.state.currentLocation.lat,
            lng: this.state.currentLocation.lng
          }}
          title={'Current Location'}
          icon={bluedot}
        />
        {data.map((location, index) => {
          return (
            <Marker
              key={index}
              onClick={this.onMarkerClick}
              title={location.type}
              position={{ lat: location.lat, lng: location.long }}
              name={location.location}
              address={location.address}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          <Paper>
            <Typography variant="h4" component="h4">
              {this.state.selectedPlace.name}
            </Typography>
            <Typography variant="subtitle2" component="h4">
              {this.state.selectedPlace.address}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {this.state.selectedPlace.title}
            </Typography>
            <Typography variant="h5" component="p">
              {this.state.distanceFromCurrent}
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_API_KEY}`
})(MapContainer);
