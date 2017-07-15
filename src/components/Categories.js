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
			console.log('Categories',response.data.data);
			this.setState({
				data:response.data.data
			})
		});
	}

	render() {
		return (
			<div className="ui list categories">
				<h3>Categories</h3>
				{
					this.state.data.map(item => {
						return (
							<Link key={item.id} className="item" to={{pathname:"/category/"+item.id.toString(),query : {category: item.slug}}} >{item.name}</Link>
							)
						})
				}

				{/*<Link className="item" to="/category/1">Men Bags</Link>*/}
				{/*<Link className="item" to="/category/1">Women Bags</Link>*/}
				{/*<Link className="item" to="/category/1">Tablet Cases</Link>*/}
				{/*<Link className="item" to="/category/1">Specials</Link>*/}
			</div>
		);
	}
}
