// src/components/business.js

// Import react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router'

class Staff extends Component {

	constructor() {
		super();
		// Define state
		this.state = {
			staffId: "",
			businessId: "",
			email: "",
			firstName: "",
			lastName: "",
			position: "",
			businessName: "",
			phone: "",
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

	handleDelete(staffId, e) {
		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/remove-staff/staffId/${staffId}`
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
			url: `/api/update-staff/${this.state.staffId}/email/${this.state.email}/firstName/${this.state.firstName}/lastName/${this.state.lastName}/position/${this.state.position}/phone/${this.state.phone}`
		}).then(() => {
			this.setState({
				edit: false
			});
			this.getStaff();
		}).catch(err => {
			console.log(err);
		})

		event.preventDefault();
	}

	getStaff() {

		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/businesses/${this.props.match.params.businessId}/staff/${this.props.match.params.staffId}`
		}).then(data => {
			this.setState({
				staffId: data.data.data.staff_id,
				businessId: data.data.data.business_id,
				email: data.data.data.email,
				firstName: data.data.data.first_name,
				lastName: data.data.data.last_name,
				position: data.data.data.position,
				businessName: data.data.data.business_name,
				phone: data.data.data.phone,
				dataLoaded: true
			});
		}).catch(err => {
			console.log(err);
		});
	}

	renderStaff() {
		if (this.state.dataLoaded) {
			if(this.state.edit) {
				return (
					<form className="center" onSubmit={this.handleSubmit}>
					<label>
						<input placeholder="Email" name="email" type="email" required
							value={this.state.email}
							onChange={this.handleInputChange} />
					</label>
					<label>
						<input placeholder="First name" name="firstName" type="text" required
							value={this.state.firstName}
							onChange={this.handleInputChange} />
					</label>
					<label>
						<input placeholder="Last name" name="lastName" type="text" required
							value={this.state.lastName}
							onChange={this.handleInputChange} />
					</label>
					<label>
						<select name="position" required
							value={this.state.position}
							onChange={this.handleInputChange}>
							<option value="">Type</option>
							<option value="Kitchen">Kitchen</option>
							<option value="Service">Service</option>
							<option value="PR">PR</option>
						</select>
					</label>
					<label>
						<input placeholder="Phone" name="phone" type="tel"
							value={this.state.phone}
							onChange={this.handleInputChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				)
			} else {
				return (
					<table className="center">
						<thead>
							<tr>
								<th>Email</th>
								<th>First name</th>
								<th>Last name</th>
								<th>Position</th>
								<th>Business name</th>
								<th>Phone</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{this.state.email}</td>
								<td>{this.state.firstName}</td>
								<td>{this.state.lastName}</td>
								<td>{this.state.position}</td>
								<td>{this.state.businessName}</td>
								<td>{this.state.phone}</td>
								<td>
									<button onClick={(e) => this.enableEdit(e)}>Edit</button>
									<button onClick={(e) => this.handleDelete(this.state.staffId, e)}>Delete</button>
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
		this.getStaff();
	}

	render() {

		const { from } = this.props.location.state || '/'
		const { redirect } = this.state

		return (
			<div className="staff">
				{this.renderStaff()}
				<br />
				<Link className="back" to={`/businesses/${this.props.match.params.businessId}/staff`}>Back</Link>
				{redirect && (
					<Redirect to={from || `/businesses/${this.props.match.params.businessId}/staff`}/>
				)}
			</div>
		)
	}
};

export default Staff;