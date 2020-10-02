import React from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup, FlyToInterpolator} from "react-map-gl"
import SideDrawer from './SideDrawer'
import RightSideDrawer from './RightSideDrawer'
import 'mapbox-gl/dist/mapbox-gl.css';


export default class App extends React.Component {



  state = {
    viewport: {
    latitude: 40.705726,
    longitude: -92.328801,
    width: '100vw',
    height: '100vh',
    zoom: 4,
    detailClick: false,
    infoClick: false
    },
    locations: [],
    selectedPark: null,
    clickDraw: true,
    currentList: {},
    armodel: [],
    modelUrl: [],
    mapStyle: "mapbox://styles/reckoner655/ckex3g8ar0ja519p59a247nev"
  }

  mapStyleHandler=(value) => {
    if(value === "decimel"){
      this.setState({mapStyle: "mapbox://styles/reckoner655/ckex80fhh0yrr19nsp9izb251"})
    }
    if(value==="blueprint"){
      this.setState({mapStyle: "mapbox://styles/reckoner655/ckea4ate26ngo19mpumbc4brw"})
    }
    if(value==="frank"){
      this.setState({mapStyle: "mapbox://styles/reckoner655/ckex3g8ar0ja519p59a247nev"})
    }
    if(value==="standard"){
      this.setState({mapStyle: "mapbox://styles/reckoner655/ckex8egj60rk01apit4gtiwx5"})
    }
    if(value==="japan"){
      this.setState({mapStyle: "mapbox://styles/reckoner655/ckex8fydg0d8h19msipla3tw7"})
    }

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
      let newArr = [...this.state.locations, resp]
      this.setState({locations: newArr})
      this.setState({selectedPark: resp}, ()=>{
        this.goToViewport(this.state.selectedPark.longitude, this.state.selectedPark.latitude)
      })
    })
  }

  renderCurrentList = (obj) => {
    this.setState({
      currentList: obj
    },
    console.log(obj))
  }

  goToViewport = (long, lat) => {
    this._onViewportChange({
      longitude: long,
      latitude: lat,
      zoom: 16,
      transitionInterpolator: new FlyToInterpolator({speed: 2.5}),
      transitionDuration: 'auto'
    });
  };
  
  zoomOuter = () => {
      this._onViewportChange({
        latitude: 40.705726,
        longitude: -92.328801,
        zoom: 3,
        transitionInterpolator: new FlyToInterpolator({speed: 2.5}),
        transitionDuration: 'auto'
      });
  };

  _onViewportChange = viewport =>
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });

  

  fetchModels = (name) => {
    fetch(`https://poly.googleapis.com/v1/assets?keywords=bear&format=gltf&key=AIzaSyD6scPIQ_u-_5E62s6mYDvEt5vkWTHE0R4`)
    .then(resp => resp.json())
    .then(resp => {
    let armodel = resp.assets
    armodel = armodel.find(a => a.displayName.includes("bear"))
    armodel = armodel.formats.find(a => a.formatType.includes("GLTF2"))
    let root = armodel.root.url
    let arr = [...this.state.modelUrl, resp]
    this.setState({modelUrl: arr})
    }
 
    )
  }



  render(){
    

    
    console.log(this.state)

    return (
    <div>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={this.state.mapStyle}
        onViewportChange={this._onViewportChange}
      >

      <button className="hide-show-bar" onClick={this.sideDrawerClickHandler}> {this.state.clickDraw ? <img className="rotateImg" src={process.env.PUBLIC_URL + '/front.svg'} /> :  <img className="rotateImg" src={process.env.PUBLIC_URL + '/back.svg'} />}</button>
      
      {this.state.clickDraw ? <SideDrawer mapStyleHandler = {this.mapStyleHandler} currentList = {this.state.currentList} locations={this.state.locations} NewImageFormSubmit={this.NewImageFormSubmit} firstListRender={this.firstListRender} goToViewport={this.goToViewport}  ListSelectHandler={this.ListSelectHandler} renderCurrentList={this.renderCurrentList} numListChoice={this.numListChoice}/> : null }
      
      {this.state.selectedPark ? <RightSideDrawer selectedPark={this.state.selectedPark}/> : null}


      {this.state.locations.map((location)=> (

        
        <div> 


     
        <Marker latitude={location.latitude} longitude={location.longitude}>
        <div onClick={(e)=> {
            e.preventDefault()
            this.setState({selectedPark: location},
              () => {this.goToViewport(this.state.selectedPark.longitude, this.state.selectedPark.latitude)}
            )
            }}> 
          <model-viewer className={"mview-app"} src={location.model_url}
              camera-controls >
            
              { this.state.selectedPark ? 
                <button className="detailClick" onClick={() => {
                  this.setState({detailClick: !this.state.detailClick})
                  }} slot="hotspot-hand" data-position="-0.54 0.93 0.1" data-normal="-0.73 0.05 0.69">
                    {this.state.detailClick ? <div id="annotation"> {this.state.selectedPark.name}  </div> : null }
                </button> : null

              }
              
              { this.state.selectedPark ? 
               <button className="infoClick" onClick={() => {
                  this.setState({infoClick: !this.state.infoClick})
                  }} slot="hotspot-foot" data-position="0 1.75 0.35" data-normal="0 0 1">
                    {this.state.infoClick ? <div id="annotation"> {this.state.selectedPark.description.substring (0,99) } </div> : null }
                </button> : null
              }            
        
          </model-viewer>         
        </div>
        </Marker>
        </div>
        ))}

        {this.state.selectedPark ? (
          <Popup  className = "marker-pop-up" latitude={this.state.selectedPark.latitude} 
          longitude={this.state.selectedPark.longitude}
          onClose={()=>{
            this.setState({selectedPark: ""},
            this.zoomOuter())

            }} 
          >
            <div> 
              <div className="marker-div"> 
                
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div> 
  );
  }
   

  
}



