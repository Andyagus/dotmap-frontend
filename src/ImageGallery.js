import React from 'react'
import ImageCard from './ImageCard'
export default class ImageGallery extends React.Component{
	render(){

		let images = this.props.selectedPark.images.map(image => <ImageCard image={image}/>)


		return(
			<div>
			<h5> Image Gallery </h5>
			{images}
			</div>
		)
	}
}