import React from 'react'
import ImageGallery from './ImageGallery'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader



export default class RightSideDrawer extends React.Component{
	render(){
			
		
		return(
				<div className="sd-parent-right">
					<div className="right-side-drawer">
						<div> <ImageGallery images={this.props.selectedPark.images}/> </div> 
						<div className="mahdetails">
							<h3> {this.props.selectedPark.name} </h3>
							<p class="sp-description"> {this.props.selectedPark.description ? this.props.selectedPark.description.substring (0,1000) : "There is no available information in this landmark"} </p>
						</div>
					</div>

				</div>
		)
	}
}



