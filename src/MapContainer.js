import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { makeCancelable } from './lib/cancelablePromise';
import data from './data/mailing_locations_list.json';
import reddot from './images/red-dot-md.png';
import { getDistance } from './lib/distanceBetweenTwoPointsLatLong';
import post from './images/Envelope.png';

// import SearchBar from './components/search-bar/SearchBar';

import Typography from '@material-ui/core/Typography';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: {},
      distanceFromCurrentLocation: '',
      directionsURL: ''
    };
  }

  componentDidMount = () => {
    if (navigator && navigator.geolocation) {
      this.geoPromise = makeCancelable(
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        })
      );

      this.geoPromise.promise
        .then(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        })
        .catch(e => e);
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

    this.setState(prevState => ({
      distanceFromCurrentLocation: getDistance(
        prevState.currentLocation.lat,
        prevState.currentLocation.lng,
        prevState.selectedPlace.position.lat,
        prevState.selectedPlace.position.lng
      )
    }));
  };

  getDirectionsURL = (currentLat, currentLng, destLat, destLng) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destLat},${destLng}`;
  };

  handleOnOpen = () => {
    this.setState(prevState => ({
      directionsURL: this.getDirectionsURL(
        prevState.currentLocation.lat,
        prevState.currentLocation.lng,
        +prevState.selectedPlace.position.lat,
        +prevState.selectedPlace.position.lng
      )
    }));
  };

  render() {
    const {
      currentLocation,
      selectedPlace,
      distanceFromCurrentLocation,
      directionsURL
    } = this.state;
    return (
      <div className="map-container">
        <h1>Where To Mail</h1>
        {/* <SearchBar /> */}
        <Map
          centerAroundCurrentLocation
          google={this.props.google}
          onClick={this.onMapClick}
          zoom={17}
          initialCenter={{
            lat: 1.281306,
            lng: 103.864029
          }}
          // style={{ height: '100%', width: '100%', position: 'fixed' }}
        >
          <Marker
            position={{
              lat: currentLocation.lat,
              lng: currentLocation.lng
            }}
            title={'Current Location'}
            icon={reddot}
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
                icon={post}
              />
            );
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showInfoWindow}
            onOpen={this.handleOnOpen}
            maxWidth="200"
          >
            <Typography variant="h5" component="h5">
              {selectedPlace.name}
            </Typography>
            <Typography variant="subtitle2" component="h4">
              {selectedPlace.address}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {selectedPlace.title}
            </Typography>
            {Object.keys(currentLocation).length !== 0 && (
              <Typography variant="h6" component="p">
                {distanceFromCurrentLocation}
              </Typography>
            )}
            <a href={directionsURL}>Get directions</a>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_API_KEY}`
})(MapContainer);
