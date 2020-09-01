import React from 'react'
import ImageCard from '../components/ImageCard'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default class ImageGallery extends React.Component{
	render(){
		let images = this.props.images.map((image, index) => <ImageCard index={index} image={image}/>)
		return(
			<div className={"image-gallery"}>
			<Carousel>
			{images}
			</Carousel>
			</div>
		)
	}
}