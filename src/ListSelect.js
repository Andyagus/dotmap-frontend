import React from 'react'
const baseUrl = "http://localhost:3000/users"

export default class ListSelect extends React.Component{
	
	state = {
		users: [],
		selectedUser: "",
		currentLandmarks: []
	}

	componentDidMount(){
		fetch("http://localhost:3000/users/")
		.then(resp => resp.json())
		.then(resp => this.setState({users: resp}))
	}


	render(){
		return(
			<div> 
				<h4> Your Lists </h4>
				<select onChange={(e) => {
					this.props.ListSelectHandler(e)
					}}>
				  {this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
				</select>
				<button> Create New List </button>
			</div>
		)
	}
}