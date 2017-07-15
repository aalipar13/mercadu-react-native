import React from 'react';
import events from '../vendor/pub-sub';
import _ from 'lodash/object';
import {Link} from 'react-router';
import axios from 'axios';
import LoadingIcon from '../../public/ripple.svg';

export default class SidebarCart extends React.Component {
	state = {
		currentCart : {
			total_items: 0,
			totals : {
				post_discount : {
					formatted : {
						with_tax: null
					}
				}
			}
		},
		addingToCart: false
	};
	componentWillMount() {
		let _this = this;
		axios.get(`http://dev.mercadu-web.com:8000/api/cart/2`).then((response) => {
			console.log(response.data.data);
			this.setState({
				currentCart: response.data.data.details
			});
			events.publish('CART_UPDATED', {
				cart: response.data.data.details // any argument
			});

		});

		// Initial content load of the cart content
		// moltin.Authenticate(function () {
		// 	moltin.Cart.Contents(function(items) {
		// 		events.publish('CART_UPDATED', {
		// 			cart: items // any argument
		// 		});
        //
		// 		_this.setState({
		// 			currentCart: items
		// 		})
		// 	}, function(error) {
		// 		// Something went wrong...
		// 	});
		// });

		// Listen to theCART_UPDATED event. Once it happens, take the object from the
		// published event and pass it to the currentCart state
		events.subscribe('CART_UPDATED', function(obj) {
			console.log('CART_UPDATED',obj);
			_this.setState({
				currentCart: obj.cart
			});
		});

		// Listen to the ADD_TO_CART event
		events.subscribe('ADD_TO_CART', function(obj) {
			console.log('ADD_TO_CART',obj);
			_this.setState({
				addingToCart: obj.adding
			});
		});

			// Once it fires, get the latest cart content data
			// moltin.Authenticate(function () {
			// 	moltin.Cart.Contents(function(items) {
            //
			// 		// Pass the new cart content to CART_UPDATED event
			// 		events.publish('CART_UPDATED', {
			// 			cart: items
			// 		});
            //
			// 		_this.setState({
			// 			currentCart: items
			// 		})
			// 	}, function(error) {
			// 		// Something went wrong...
			// 	});
			// });
		// });
	}

	render() {
		let preparedCartContent;
		let total = 0;
		if (this.state.currentCart) {
			let cartContent = this.state.currentCart;
			total = this.state.currentCart.length;
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
								<span className="header">{result.product_name} <br/><span className="price">{'₱ '+result.product_price}</span></span>
							</div>
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


		// let total = map(this.state.currentCart.details, ());

		return (

			<div className="sidebar-cart sidebar-element">
				<h4>In Cart: <span className="price">{total}</span></h4>
				{/*// If the cart is not empty, add 'active' class to it*/}
				<Link to="/checkout" className={`ui checkout button tiny ${total >= 1 ? 'active': ''}`}>
					<i className="paypal icon"></i>Checkout</Link>
				<div className="ui items">
					{preparedCartContent}
				</div>

				<img className={`loading-icon ${!this.state.addingToCart ? 'non-visible' : ''}`} src={LoadingIcon} alt="Loading"/>
			</div>
		);
	}
}
