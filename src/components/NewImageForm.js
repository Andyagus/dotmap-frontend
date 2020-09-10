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
					<div> 
					<input type="file" id="file" className="inputfile" placeholder={this.state.image[0]} name="image" onChange={this.onChange}/>
					<div> <label class="label-thang" for="file">Choose a file</label></div>
					<input type="submit"/>
					</div>
				</form>
			</div>
		)
	}
}