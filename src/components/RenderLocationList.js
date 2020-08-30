import React from 'react'
import LocationListHandler from './LocationListHandler'

export default class RenderLocationList extends React.Component{
	render(){
		 console.log(this.props)
		 let locations = this.props.locations.map((location, index) => <LocationListHandler num={index} location={location} numListChoice={this.props.numListChoice} LocationListSelector={this.props.LocationListSelector} /> )
		 return(
			<div> 
				{locations}
			</div>
		)
	}
}