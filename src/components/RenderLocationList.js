import React from 'react'
import LocationListHandler from './LocationListHandler'

export default class RenderLocationList extends React.Component{
	render(){		 
		const updatedLocations = Array.from(new Set(this.props.locations.map(a => a.id)))
 				.map(id => {
   		return this.props.locations.find(a => a.id === id)
		})

		 let locations = updatedLocations.map((location, index) => <LocationListHandler num={index} location={location} numListChoice={this.props.numListChoice} LocationListSelector={this.props.LocationListSelector} /> )
		 return(
			<div> 
				{locations}
			</div>
		)
	}
}