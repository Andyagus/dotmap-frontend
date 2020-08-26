import React from 'react'

export default class ListSelect extends React.Component{
	
	render(){
		return(
			<div> 
				<h4> Your Lists </h4>
				<select name="cars" id="cars">
				  <option value="all">All Locations</option>
				  <option value="saab">My Favorites</option>
				  <option value="mercedes">Art Museums</option>
				</select>
				<button> Create New List </button>
			</div>
		)
	}
}