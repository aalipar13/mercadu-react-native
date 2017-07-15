import React, { Component } from 'react';
import moltin from '../vendor/moltin';
import axios from 'axios';
import ProductList from './ProductList';
import Cover from './Cover'

class Home extends React.Component {
	state = {
		data: [],
		loaded: false
	};
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loaded: false
		}
	}

	componentDidMount() {
		let _this = this;
		// moltin.Authenticate(function() {
		// 	_this.setState({
		// 		data: moltin.Product.List()
		// 	});
		// });

		axios.get(`http://dev.mercadu-web.com:8000/api/home`).then((response)=> {
			console.log(response.data.data);
			this.setState({
				data:response.data.data
			})
		});

	}

	render() {
		return (
			<div className="home-intro">
				{/*<Cover/>*/}
				<ProductList products={this.state.data}/>
			</div>
		);
	}
}

export default Home;
