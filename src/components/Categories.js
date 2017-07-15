import React from 'react';
import {Link} from 'react-router'
import axios from 'axios';

export default class Categories extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loaded: false
		}
	}

	componentDidMount() {
		axios.get(`http://dev.mercadu-web.com:8000/api/all-tag`).then((response)=> {
			this.setState({
				data:response.data.data
			})
		});
	}

	render() {
		return (
			<div className="ui list categories">
				<Link className="item" to="/category/1">Men Bags</Link>
				<Link className="item" to="/category/1">Women Bags</Link>
				<Link className="item" to="/category/1">Tablet Cases</Link>
				<Link className="item" to="/category/1">Specials</Link>
			</div>
		);
	}
}
