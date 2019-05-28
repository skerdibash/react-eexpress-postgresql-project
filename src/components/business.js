// src/components/business.js

// Import react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router'

class Business extends Component {

	constructor() {
		super();
		// Define state
		this.state = {
			businessId: "",
			name: "",
			location: "",
			type: "",
			dataLoaded: false,
			edit: false,
			redirect: false
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	enableEdit(e) {
		
		this.setState({
			edit: true
		});

	}

	handleDelete(businessId, e) {
		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/remove-business/businessId/${businessId}`
		}).then(() => {
			this.setState({
				redirect: true
			});
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
			url: `/api/update-business/${this.state.businessId}/name/${this.state.name}/location/${this.state.location}/type/${this.state.type}`
		}).then(data => {
			this.setState({
				edit: false
			});
			this.getBusiness();
		}).catch(err => {
			console.log(err);
		})

		event.preventDefault();
	}

	getBusiness() {
		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/businesses/${this.props.match.params.businessId}`
		}).then(data => {
			this.setState({
				businessId: data.data.data.business_id,
				name: data.data.data.name,
				location: data.data.data.location,
				type: data.data.data.type,
				dataLoaded: true
			});
		}).catch(err => {
			console.log(err);
		});
	}

	renderBusiness() {
		if (this.state.dataLoaded) {
			if(this.state.edit) {
				return (
					<form className="center" onSubmit={this.handleSubmit}>
						<label>
							<input placeholder="Name" name="name" type="text" required
								value={this.state.name}
								onChange={this.handleInputChange} />
						</label>
						<label>
							<input placeholder="Location" name="location" type="text" required
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
						<input type="submit" value="Submit" />
					</form>
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
							<tr>
								<td>{this.state.name}</td>
								<td>{this.state.location}</td>
								<td>{this.state.type}</td>
								<td>
									<button onClick={(e) => this.enableEdit(e)}>Edit</button>
									<button onClick={(e) => this.handleDelete(this.state.businessId, e)}>Delete</button>
									<button><Link to={`/businesses/${this.state.businessId}/staff`}>Staff</Link></button>
								</td>
							</tr>
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
		this.getBusiness();
	}

	render() {

		const { from } = this.props.location.state || '/'
		const { redirect } = this.state

		return (
			<div className="business">
				{this.renderBusiness()}
				<br />
				<Link className="back" to="/businesses">Back</Link>
				{redirect && (
					<Redirect to={from || "/businesses"}/>
				)}
			</div>
		)
	}
};

export default Business;