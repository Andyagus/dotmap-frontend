import React from 'react'

export default class NewImageForm extends React.Component{
	state = {
		image: {}
	}

	onChange = (e) => {
		e.persist()
		this.setState({image: e.target.files[0]})
	}

	onSubmit = (e) => {
		e.preventDefault()
		const form =  new FormData()
		form.append("image", this.state.image)
		console.log(form)
		fetch(`http://localhost:3000/images`,{
			method:"POST",
			body: form
			})
	}

	render(){
		return(
			<div className="form">
				<form onSubmit={this.onSubmit}>
					<label> Image Upload </label>
					<input type="file" name="image" onChange={this.onChange}/>
					<input type="submit"/>
				</form>`
			</div>
		)
	}
}