import React from 'react';
import {Link} from 'react-router'
import axios from 'axios';
import AddToCartButton from '../components/AddToCartButton'

export default class Category extends React.Component {
	state = {
		list:{}
	};

	constructor(props) {
		super(props);

		this.state = {
			list: {}
		}
	}



	componentDidMount() {
		// let _this = this;
		// let id = this.props.routeParams.id;
		axios.get(`http://dev.mercadu-web.com:8000/api/tag?q=${this.props.location.query.category}`).then((response) => {
			this.setState({
				list: response.data.data
			});
		});
	}

	render() {
		let allItems = {};
		 let {products} = this.state.list;
		// Create allItems function from the props we get from Home component
		if (products) {
			console.log(products)
			allItems = products.map((result, id) => {
				return (
					<div key={id} className="column product-list-element">
						<div className="ui card" >
							<div className="image">
								{
									(result.photo)
										// If we have an image set
										? <img src={'http://dev.mercadu-web.com:8000'+result.photo}/>

										//put some placeholder
										: <img src="http://placehold.it/300x380" />
								}


								<div className="extra content">
									<div className="buttons-container">
										<AddToCartButton productId={result.id} additionalClass="inverted"/>
										<Link className="ui inverted button" to={`/product/${result.id}`}>Details</Link>
									</div>
								</div>
							</div>
							<div className="content">
								<span className="header">{result.name}</span>
								<div className="price">
									<span>{result.sale_price}</span>
								</div>
							</div>
						</div>
					</div>
				);
			});
		}


		return (
			<div className="spotlight-container">
				<div className="ui stackable three column grid">
					{allItems}
				</div>
			</div>
		);
	}
}
