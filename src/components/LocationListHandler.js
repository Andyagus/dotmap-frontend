import React from 'react'


export default class LocationListHandler extends React.Component{
	
	state = {
		selectedLocation: ""
	}


	clickHandler = () => {
			this.setState({selectedLocation:this.props.location},
				() => {this.props.numListChoice(this.state.selectedLocation)}
			)

		}

	render(){
		let num = this.props.num+1
		let locationName = this.props.location.name
		
		return(
			
			<div>
				<div class="location-list"> 
					
					<p> {num}</p>
					<h4   

					className={this.state.selectedLocation ? 'active-link': 'passive-link'} 
					onClick={() => {this.clickHandler()}}> 
					{locationName}  
				</h4>
				</div>
			</div>
		)
	}
}