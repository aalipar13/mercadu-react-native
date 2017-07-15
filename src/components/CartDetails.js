import React, { Component } from 'react';
import events from '../vendor/pub-sub';
import _ from 'lodash/object';
import moltin from '../vendor/moltin';
import LoadingIcon from '../../public/ripple.svg';
import map from 'lodash/map';
import {Link} from 'react-router';
import axios from 'axios';

export default class CartDetails extends React.Component {
	state = {
		currentCart : {
			total_items: 0,
			contents: {},
			totals : {
				post_discount : {
					formatted : {
						with_tax: null
					}
 				}
			}
		},
		loaded: false,
		removing: false
	};

	componentDidMount() {
		let _this = this;
		// moltin.Authenticate(function () {
		// 	moltin.Cart.Contents(function(items) {
		// 		events.publish('CART_UPDATED', {
		// 			cart: items // any argument
		// 		});
        //
		// 		_this.setState({
		// 			currentCart: items,
		// 			loaded: true
		// 		})
		// 	}, function(error) {
		// 		// Something went wrong...
		// 	});
		// });

		axios.get(`http://dev.mercadu-web.com:8000/api/cart/2`).then((response) => {
			console.log(response.data.data);
			this.setState({
				currentCart: response.data.data,
				loaded:true
			});

		});
	}

	removeFromCart(clicked) {
		let _this = this;
		this.setState({
			removing: true
		});
		let data = {
			product_id: clicked
		}

		axios.delete(`http://dev.mercadu-web.com:8000/api/cart/2/${clicked}`).then((response) => {
			console.log(response.data.data);
			this.setState({
				currentCart: response.data.data,
				loaded:true,
				removing:false
			});


		});

		// moltin.Authenticate(function () {
		// 	moltin.Cart.Remove(clicked, function() {
		// 		moltin.Cart.Contents(function(items) {
		// 			events.publish('CART_UPDATED', {
		// 				cart: items // any argument
		// 			});
        //
		// 			_this.setState({
		// 				currentCart: items,
		// 				loaded: true,
		// 				removing: false
		// 			})
		// 		}, function(error) {
		// 			// Something went wrong...
		// 		});
        //
		// 		console.log('item removed', clicked)
		// 	}, function(error) {
		// 		// Something went wrong...
		// 	});
		// });
	}

	_getSum(arr) {
		let sum =0;
		for (let i = 0; i<arr.length ;i++) {
			sum += arr[i];
		}
		return sum;
	}
	render() {
		let preparedCartContent;
		let total = 0;
		let sum = this._getSum(map(this.state.currentCart.details, 'product_price'));

		if (this.state.currentCart.details) {
			let cartContent = this.state.currentCart.details;
			total = this.state.currentCart.details.length;

			// If the cart is not empty, display the cart items
			if (total >= 1) {
				preparedCartContent = cartContent.map((result, id) => {
					return(
						<div className="item" key={id}>
							<div className="ui tiny image">
								{
									(result.product_photo)
										// If we have an image set
										? <img src={'http://dev.mercadu-web.com:8000'+result.product_photo} />

										//else put some placeholder
										: <img src="http://placehold.it/300x380" />
								}
							</div>
							<div className="content">
								<Link to={`/product/${result.id}`}>
								<span className="header">{result.product_name} <br/>
								<span className="price">{'₱ '+result.product_price}</span>
							</span>
								</Link>
							</div>

							<button  onClick={() => { this.removeFromCart(result.product_id)}} className={`remove ui button ${this.state.removing ? 'disabled' : ''}`}>
								<i className="remove outline icon"></i></button>
						</div>
					)
				});
			}

			// If the cart is empty, display the message
			else {
				preparedCartContent = (
					<span className="empty">
					The Cart is empty
				</span>
				);
			}
		}


		return (
			<div className="cart-details">

				<div className="ui items">
					{preparedCartContent}

					<div className="total">
						<span className="text">TOTAL: </span>
						<span className="price">{'₱ '+sum}</span>
					</div>
				</div>
			</div>
		);
	}
}
