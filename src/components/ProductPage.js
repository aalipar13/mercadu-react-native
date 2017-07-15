import React from 'react'
import moltin from '../vendor/moltin';

import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash'
import LoadingIcon from '../../public/ripple.svg';
import { Accordion, Icon } from 'semantic-ui-react';
import AddToCartButton from '../components/AddToCartButton'


export default class Product extends React.Component {
	state = {
		id: this.props.location.pathname.replace('/product/', ''), // remove string '/product/' from the url and use the id only
		loaded: false,
		product: {
			images: [
				{
					url: ''
				}
			],

			price: {
				value: ''
			}
		},
		galleryLoaded: false
	};

	componentWillMount() {
		let _this = this;

		// moltin.Authenticate(function() {
		// 	_this.setState({
		// 		product: moltin.Product.Get(_this.state.id),
		// 	});
		// });
		let id = this.props.routeParams.id;
		axios.get(`http://dev.mercadu-web.com:8000/api/product/${id}`).then((response) => {
			console.log(response.data.data);
			_this.setState({
				product: response.data.data
			});
		});
	}

	// componentDidMount() {
	// 	let _this = this;
    //
	// 	// moltin.Authenticate(function() {
	// 	// 	_this.setState({
	// 	// 		product: moltin.Product.Get(_this.state.id),
	// 	// 	});
	// 	// });
	// 	let id = this.props.routeParams.id;
	// 	axios.get(`http://dev.mercadu-web.com:8000/api/product/${id}`).then((response) => {
	// 		console.log(response.data.data);
	// 		_this.setState({
	// 				product: response.data.data
	// 			});
	// 	});
	// }

	render() {
		//initialize an empty gallery array.
		const gallery = [];
		let _this = this;
		gallery[0] = {
			original: 'http://dev.mercadu-web.com:8000'+this.state.product.photo,
			thumbnail: 'http://dev.mercadu-web.com:8000'+this.state.product.photo
		};


		return (
			<div className="product-container">
				<div className="top">
					<div className="ui grid">
						<div className="ten wide column">
							{/*<div className="overlay">*/}
							{/*<img src={LoadingIcon} alt="Loading"/>*/}
							{/*</div>*/}

							<div className="no-overflow">
								<ImageGallery
									thumbnailPosition={'left'}
									showNav={false}
									showPlayButton={false}
									slideOnThumbnailHover={true}
									items={gallery}
									slideInterval={2000}
								/>
							</div>
						</div>
						<div className="six wide column">
							<div className="product-details">
								<h1>{this.state.product.name} <span className="price">{'₱ '+this.state.product.regular_price}</span></h1>
								<AddToCartButton additionalClass="fluid ui button" productId={this.state.product.id}/>

								<Accordion styled defaultActiveIndex={0}>
									<Accordion.Title>
										<Icon name='dropdown' />
										Product Description
									</Accordion.Title>
									<Accordion.Content>
										<p>
											{this.state.product.description}
										</p>
										<p>Code: {this.state.product.code}</p>
										<p>Available: {this.state.product.available}</p>
									</Accordion.Content>
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
