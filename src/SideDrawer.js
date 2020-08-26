import React from 'react'
import NewImageForm from './NewImageForm'
import ListSelect from './ListSelect'

export default class SideDrawer extends React.Component{
	


	render(){
		console.log(this.state)
		return(
		<div className="sd-parent">	
			<div className = "side-drawer">
				
				<NewImageForm />

				<ListSelect />
			</div>
		</div>
		)
	}
}