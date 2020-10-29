import React from 'react'

export default class ListSelect extends React.Component{
	
	state = {
		lists: [],
		selectedUser: "",
		currentLandmarks: [],
		list: ""
	}

	componentDidMount(){
		fetch("http://localhost:3000/lists/")
		.then(resp => resp.json())
		.then(resp => this.setState({lists: resp},
			() => {this.props.firstListRender(this.state.lists[0])}
		))

	}

	submitHandler = (e) => {
		e.preventDefault()
		this.setState({list: e.target.value})
		const form =  new FormData()
    form.append("name", this.state.list)
    fetch(`http://localhost:3000/lists`,{
      method:"POST",
      body: form
      })
    .then(resp => resp.json())
    .then(resp => {
    	let newArr = [...this.state.lists, resp]
    	console.log(newArr)
    	this.setState({lists: newArr},
    	this.setState({list: ""}),
    	this.props.renderCurrentList(resp.id)
    	)
    })
	}

	render(){

		return(
		<div>
			<div> 
				<h4> Your Lists </h4>
				<select className="listSelect" onChange={(e) => {
					this.props.ListSelectHandler(e)
					}}>
				  {this.state.lists.map(user => <option value={user.id}>{user.name}</option>)}
				</select>
			</div>
			<form onSubmit={(e)=>{
				this.submitHandler(e)
				}}> 
  			<input type="text" placeholder="New List" value={this.state.list} onChange={(e)=>{
  				this.setState({list: e.target.value})
  				}}/>
  			<input  type="submit" value="Submit" />

			</form>
		 <hr>
		 </hr>
		</div>
		)
	}
}