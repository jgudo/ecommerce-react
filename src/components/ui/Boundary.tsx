import React, { Component } from 'react';

class Boundary extends Component {
	state = {
		hasError: false
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error) {
		console.log(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="loader">
					<h3>:( Something went wrong.</h3>
				</div>
			);
		}

		return this.props.children;
	}
}

export default Boundary;
