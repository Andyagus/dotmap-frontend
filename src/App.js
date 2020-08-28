import React from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup, FlyToInterpolator} from "react-map-gl"
import SideDrawer from './SideDrawer'
import ImageGallery from './ImageGallery'

export default class App extends React.Component {



  state = {
    viewport: {
    latitude: 48.858461,
    longitude: 2.294351,
    width: '100vw',
    height: '100vh',
    zoom: 4
    },
    locations: [],
    selectedPark: "",
    clickDraw: true,
    currentList: ""
  }



  componentDidMount(){
    fetch(`http://localhost:3000/lists/1`)
    .then(resp => resp.json())
    .then(resp => this.setState({locations: resp}))
  }


  ListSelectHandler = (obj) => {
    fetch(`http://localhost:3000/lists/${obj.target.value}`)
    .then(resp => resp.json())
    .then(resp => this.setState({locations: resp}),
    this.setState({currentList: obj.target.value}))
    this.setState({viewport: {...this.state.viewport}})
  }

  sideDrawerClickHandler = () => {
    this.setState({clickDraw: !this.state.clickDraw})
  }


  viewChangeHandler = (nextViewport) => {
      this.setState({viewport: nextViewport})
  }


  NewImageFormSubmit = (e) => {
    const form =  new FormData()
    form.append("image", e)
    form.append("list", this.state.currentList)
    fetch(`http://localhost:3000/images`,{
      method:"POST",
      body: form
      })
    .then(resp => resp.json())    
    .then(resp => {
      console.log(resp)
      let newArr = [...this.state.locations, resp]
      this.setState({locations: newArr})
      this.setState({selectedPark: resp})
    })
  }


  goToViewport = (long, lat) => {
    this._onViewportChange({
      longitude: long,
      latitude: lat,
      zoom: 15,
      transitionInterpolator: new FlyToInterpolator({speed: 2.5}),
      transitionDuration: 'auto'
    });
  };
  
  _onViewportChange = viewport =>
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });


  render(){
    const {viewport, settings} = this.state;

    return (
 
    <div>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        //mapStyle="mapbox://styles/reckoner655/ckea4ate26ngo19mpumbc4brw"
        
        onViewportChange={this._onViewportChange}

      >

      <button onClick={this.sideDrawerClickHandler}> {this.state.clickDraw ? "Hide SideBar" : "Show SideBar"}</button>

      {this.state.clickDraw ? <SideDrawer NewImageFormSubmit={this.NewImageFormSubmit} goToViewport={this.goToViewport} ListSelectHandler={this.ListSelectHandler}/> : null }
      
      
      {this.state.locations.map((location)=> (
        <Marker latitude={location.latitude} longitude={location.longitude} offsetLeft={-20} offsetTop={-10}>
          <button className="image-button" onClick={(e)=> {
            e.preventDefault()
            this.setState({selectedPark: location},
              () => {this.goToViewport(this.state.selectedPark.longitude, this.state.selectedPark.latitude)}
            )

            }}><img src={location.image_url} width="10%"/>
            
          </button>
        </Marker>
        ))}
        {this.state.selectedPark ? (
          <Popup  className = "marker-pop-up" latitude={this.state.selectedPark.latitude} 
          longitude={this.state.selectedPark.longitude}
          onClose={()=>{
            this.setState({selectedPark: ""},)
            }} 
          >
            <div className="marker-div"> 
              <h4> {this.state.selectedPark.name} </h4>
              <img src={this.state.selectedPark.image_url}/>
              <ImageGallery selectedPark = {this.state.selectedPark}/>

            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div> 
  );
  }
   

  
}



