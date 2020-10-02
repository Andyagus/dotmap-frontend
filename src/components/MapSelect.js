import React from 'react'

export default class MapSelect extends React.Component{
	render(){
		console.log(this.props)
		return(
			
			<div>
			<h2> Choose a map style </h2>
					<form onChange={(e) => {
						this.props.mapStyleHandler(e.target.value)
					}}>	
						<div>
						<input type="radio" name="decimel" value="decimel" />
						<label for="male">Decimel</label>
						</div>
						<div>
						<input type="radio" name="decimel" value="blueprint" />
						<label for="male">Blueprint</label>
						</div>
						<div>
						<input type="radio" name="decimel" value="frank" />
						<label for="male">Frank</label>
						</div>
						<div>
						<input type="radio" name="standard" value="stanard" />
						<label for="male">Standard</label>
						</div>
						<div>
						<input type="radio" name="standard" value="japan" />
						<label for="male">Japan</label>
						</div>
					</form>
			</div>
		)
	}
}