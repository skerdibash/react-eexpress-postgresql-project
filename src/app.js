// src/App.js

// Import react and the component class
import React, { Component } from 'react';
// Import BrowserRouter
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Businesses from './components/businesses';
import Business from './components/business';
import BusinessStaff from './components/business-staff';
import Staff from './components/staff';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={Businesses} />
					<Route exact path="/businesses" component={Businesses} />
					<Route exact path="/businesses/:businessId" component={Business} />	
					<Route exact path="/businesses/:businessId/staff" component={BusinessStaff} />
					<Route exact path="/businesses/:businessId/staff/:staffId" component={Staff} />	
				</div>
			</Router>
		)
	}
};

// Export the App component
export default App;