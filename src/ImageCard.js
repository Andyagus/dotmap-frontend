import React from 'react'

export default class ImageCard extends React.Component{
	render(){
		return(
			<img className = "card-image" src={this.props.image.image_url} alt=""/>
		)
	}
}