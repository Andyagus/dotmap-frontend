import React from 'react'
import NewImageForm from './NewImageForm'
import ListSelect from './ListSelect'

export default class SideDrawer extends React.Component{
	


	render(){
		return(
		<div className="sd-parent">	
			<div className = "side-drawer">
				
				<NewImageForm />

				<ListSelect ListSelectHandler={this.props.ListSelectHandler} />
			</div>
		</div>
		)
	}
}