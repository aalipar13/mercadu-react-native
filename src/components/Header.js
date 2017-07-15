import React from 'react'
import {Link} from 'react-router'
import Cart from './Cart'
import Logo from '../../public/mercadu-horizontal.png'
import events from '../vendor/pub-sub';

export default class Header extends React.Component {

	showSidebar = () => {
		events.publish('SIDEBAR_VISIBILITY', {
			visible: true
		});
	};

	render() {
		return (
			<header>
				<div className="ui fixed secondary menu">
					<div className="ui container fluid">
						<Link to="/" className="header logo">
							<img src={Logo} alt="`mercadu"/>
						</Link>
						<Link to="/" className="general item">Home</Link>
						<button className="item navigation-button" onClick={this.showSidebar}><i className="list layout icon"></i> Menu</button>
						<Cart/>
					</div>
				</div>
			</header>
		);
	}
}
