import React from 'react'
import NewImageForm from '../components/NewImageForm'
import ListSelect from '../components/ListSelect'
import RenderLocationList from '../components/RenderLocationList'
import PrevNext from '../components/PrevNext.js'

export default class SideDrawer extends React.Component{

	render(){
		console.log(this.props)
		return(
		<div className="sd-parent">	
			<div className = "side-drawer">
				<NewImageForm NewImageFormSubmit={this.props.NewImageFormSubmit}/>
				<ListSelect  ListSelectHandler={this.props.ListSelectHandler} />
				<RenderLocationList numListChoice={this.props.numListChoice} LocationListSelector={this.props.LocationListSelector} locations ={this.props.locations}/>
				<PrevNext />
			</div>
		</div>
		)
	}
}