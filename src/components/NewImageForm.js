import React from 'react'

export default class NewImageForm extends React.Component{
	state = {
		image: {}
	}

	onChange = (e) => {
		e.persist()
		this.setState({image: e.target.files[0]})
	}

	submitHandler = (e) => {
		e.preventDefault()
		this.props.NewImageFormSubmit(this.state.image)
	}

	render(){
		return(
			<div className="form">
				<form onSubmit={this.submitHandler}>
					<p> upload image </p>
					<input type="file" name="image" onChange={this.onChange}/>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}