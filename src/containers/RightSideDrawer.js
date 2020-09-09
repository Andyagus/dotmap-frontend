import React from 'react'
import ImageGallery from './ImageGallery'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader



export default class RightSideDrawer extends React.Component{
	render(){
			
		
		return(
				<div className="sd-parent-right">
					<div className="right-side-drawer">
					<model-viewer className={"mview-app"} src={this.props.selectedPark.model_url}
              auto-rotate camera-controls >
          </model-viewer>   
						<ImageGallery images={this.props.selectedPark.images}/>

						<h3> {this.props.selectedPark.name} </h3>
						<p class="sp-description"> {this.props.selectedPark.description ? this.props.selectedPark.description.substring (0,1000) : "There is no available information in this landmark"} </p>
					</div>

				</div>
		)
	}
}



