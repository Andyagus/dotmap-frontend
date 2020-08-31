import React from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup, FlyToInterpolator} from "react-map-gl"
import SideDrawer from './SideDrawer'
import ImageGallery from './ImageGallery'
import 'mapbox-gl/dist/mapbox-gl.css';


export default class App extends React.Component {



  state = {
    viewport: {
    latitude: 40.705726,
    longitude: -73.996953,
    width: '100vw',
    height: '100vh',
    zoom: 4
    },
    locations: [],
    selectedPark: "",
    clickDraw: true,
    currentList: {}
  }



  componentDidMount(){

  }


  numListChoice = (obj) => {
    this.setState({selectedPark: obj}, ()=>{
        this.goToViewport(this.state.selectedPark.longitude, this.state.selectedPark.latitude)
      })
  }

  ListSelectHandler = (obj) => {
    fetch(`http://localhost:3000/lists/${obj.target.value}`)
    .then(resp => resp.json())
    .then(resp => this.setState({locations: resp}),
    this.setState({currentList: obj.target.value}))
    this.setState({viewport: {...this.state.viewport}})
  }

  firstListRender = (list) => {
      console.log(list.id)
      this.setState({currentList: list.id})
      fetch(`http://localhost:3000/lists/${list.id}`)
      .then(resp => resp.json())
      .then(resp => this.setState({locations: resp}),
      this.setState({currentList: list.id}))
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
      this.setState({selectedPark: resp}, ()=>{
        this.goToViewport(this.state.selectedPark.longitude, this.state.selectedPark.latitude)
      })
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
    console.log(this.state.locations)
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

      {this.state.clickDraw ? <SideDrawer locations={this.state.locations} NewImageFormSubmit={this.NewImageFormSubmit} firstListRender={this.firstListRender} goToViewport={this.goToViewport}  ListSelectHandler={this.ListSelectHandler} numListChoice={this.numListChoice}/> : null }
      
      
      {this.state.locations.map((location)=> (
        <div> 
        <Marker latitude={location.latitude} longitude={location.longitude} offsetLeft={-20} offsetTop={-10}>
          <button className="image-button" onClick={(e)=> {
            e.preventDefault()
            this.setState({selectedPark: location},
              () => {this.goToViewport(this.state.selectedPark.longitude, this.state.selectedPark.latitude)}
            )
            }}>
            <img src={process.env.PUBLIC_URL + '/room.svg'} alt="marker icon" />
          </button>
        </Marker>
        </div>
        ))}
        {this.state.selectedPark ? (
          <Popup  className = "marker-pop-up" latitude={this.state.selectedPark.latitude} 
          longitude={this.state.selectedPark.longitude}
          onClose={()=>{
            this.setState({selectedPark: ""},)
            }} 
          >
            <div> 
              <div className="marker-div"> 
                <h4> {this.state.selectedPark.name} </h4>
                <ImageGallery selectedPark = {this.state.selectedPark}/>
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div> 
  );
  }
   

  
}



