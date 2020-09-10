import React from 'react'
import NewImageForm from '../components/NewImageForm'
import ListSelect from '../components/ListSelect'
import RenderLocationList from '../components/RenderLocationList'

export default class SideDrawer extends React.Component{

	render(){
		return(
		<div className="sd-parent">	
			<div className = "side-drawer">
				<NewImageForm NewImageFormSubmit={this.props.NewImageFormSubmit}/>
				<ListSelect  renderCurrentList={this.props.renderCurrentList} ListSelectHandler={this.props.ListSelectHandler} firstListRender={this.props.firstListRender}/>
				<RenderLocationList currentList = {this.props.currentList} numListChoice={this.props.numListChoice} LocationListSelector={this.props.LocationListSelector} locations ={this.props.locations}/>
			</div>
		</div>
		)
	}
}