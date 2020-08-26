import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import PropTypes from "prop-types";
import './App.css';
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import NewImageForm from "./NewImageForm"
const baseUrl = "http://localhost:3000/images"

export default class App extends React.Component {

  state = {
    viewport: {
    latitude: 48.858461,
    longitude: 2.294351,
    width: '100vw',
    height: '100vh',
    zoom: 1
    },
    locations: [],
    selectedPark: null
  }


  componentDidMount(){
    fetch("http://localhost:3000/images")
    .then(resp=> resp.json())
    .then(resp => this.setState({locations: resp}))
  }


  viewChangeHandler = (nextViewport) => {
      this.setState({viewport: nextViewport})
  }


  render(){
    console.log(this.state)

    return (
 
    <div>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        //mapStyle="mapbox://styles/reckoner655/ckea4ate26ngo19mpumbc4brw"
        onViewportChange = {(nextViewport)=> {
          this.viewChangeHandler(nextViewport)
          }}
      >
      <NewImageForm/>
      {this.state.locations.map((location)=> (
        <Marker latitude={location.latitude} longitude={location.longitude} offsetLeft={-20} offsetTop={-10}>
          <button className="image-button" onClick={(e)=> {
            e.preventDefault()
            this.setState({selectedPark: location})
            }}><img src={location.image_url} width="10%"/>
          </button>
        </Marker>
        ))}
        {this.state.selectedPark ? (
          <Popup latitude={this.state.selectedPark.latitude} 
          longitude={this.state.selectedPark.longitude}
          onClose={()=>{
            this.setState({selectedPark: ""})
            }}
          >
            <div className="marker-div"> 
              <h4> {this.state.selectedPark.name} </h4>
              <img src={this.state.selectedPark.image_url}/>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div> 
  );
  }
   

  
}



