// src/components/businesses.js

// Import react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Businesses extends Component {

	constructor() {
		super();
		// Define state
		this.state = {
			businesses: [],
			dataLoaded: false,
			name: "",
			location: "",
			type: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleDelete(businessId, e) {
		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/remove-business/businessId/${businessId}`
		}).then(() => {
			this.getBusinesses();
		}).catch(err => {
			console.log(err);
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		axios({
			method: 'GET',
			url: `/api/create-business/name/${this.state.name}/location/${this.state.location}/type/${this.state.type}`
		}).then(data => {
			this.setState({
				name: "",
				location: "",
				type: ""
			});
			this.getBusinesses();
		}).catch(err => {
			console.log(err);
		})

		event.preventDefault();
	}

	getBusinesses() {
		// GET request to our server
		axios({
			method: 'GET',
			url: '/api/businesses'
		}).then(data => {
			this.setState({
				businesses: data.data.data,
				dataLoaded: true
			});
		}).catch(err => {
			console.log(err);
		});
	}

	renderBusinesses() {
		if (this.state.dataLoaded) {
			if(this.state.businesses.length == 0) {
				return (
					<h3>You have no business currently, do you want to add some?</h3>
				)
			} else {
				return (
					<table className="center">
						<thead>
							<tr>
								<th>Name</th>
								<th>Location</th>
								<th>Type</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
						{this.state.businesses.map(business => {
							return (
								<tr key={business.business_id}>
									<td>{business.name}</td>
									<td>{business.location}</td>
									<td>{business.type}</td>
									<td>
										<button onClick={(e) => this.handleDelete(business.business_id, e)}>Delete</button>
										<button><Link to={`/businesses/${business.business_id}`}>More</Link></button>
									</td>
								</tr>
							)
						})}
						</tbody>
					</table>
				)
			}
		} else {
			return (
				<p>Loading...</p>
			)
		}
	}

	// Is called when the component succesfully loads
	componentDidMount() {
		this.getBusinesses();
	}

	render() {
		return (
			<div className="businesses">
				<h2>Business Control Panel</h2>
				{this.renderBusinesses()}
				<br/>
				<form className="center" onSubmit={this.handleSubmit}>
					<label>
						<input placeholder="Name" name="name" type="text" required
							value={this.state.name}
							onChange={this.handleInputChange} />
					</label>
					<label>
						<input  placeholder="Location" name="location" type="text" required
							value={this.state.location}
							onChange={this.handleInputChange} />
					</label>
					<label>
						<select name="type"
							value={this.state.type}
							onChange={this.handleInputChange}>
							<option value="">Type</option>
							<option value="Bar">Bar</option>
							<option value="Restaurant">Restaurant</option>
							<option value="Club">Club</option>
							<option value="Hotel">Hotel</option>
							<option value="Cafe">Cafe</option>
						</select>
					</label>
					<input type="submit" value="Add new" />
				</form>
			</div>
		)
	}
};

export default Businesses;