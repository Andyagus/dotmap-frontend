import React from 'react'


export default class LocationListHandler extends React.Component{
	
	state = {
		selectedLocation: ""
	}


	clickHandler = () => {
			this.props.numListChoice(this.props.location)
			this.setState({selectedLocation:this.props.location})
		}

	render(){
		console.log(this.state.selectedLocation)
		let num = this.props.num+1
		let locationName = this.props.location.name
		
		return(
			
			<div>
				<div class="location-list"> 
					
					<p> {num}</p>
					<h4   

					className={this.state.selectedLocation === this.props.location ? 'active-link': 'passive-link'} 
					onClick={() => {this.clickHandler()}}> 
					{locationName}  
				</h4>
				</div>
			</div>
		)
	}
}