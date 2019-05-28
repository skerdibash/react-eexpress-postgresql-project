// src/components/businesses.js

// Import react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class BusinessesStaff extends Component {

	constructor() {
		super();
		// Define state
		this.state = {
			businessesStaff: [],
			dataLoaded: false,
			email: "",
			firstName: "",
			lastName: "",
			position: "",
			phone: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleDelete(staffId, e) {
		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/remove-staff/staffId/${staffId}`
		}).then(() => {
			this.getBusinessesStaff();
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
			url: `/api/businesses/${this.props.match.params.businessId}/create-staff/email/${this.state.email}/firstName/${this.state.firstName}/lastName/${this.state.lastName}/position/${this.state.position}/phone/${this.state.phone}`
		}).then(() => {
			this.setState({
				email: "",
				firstName: "",
				lastName: "",
				position: "",
				phone: ""
			});
			this.getBusinessesStaff(this.props.match.params.businessId);
		}).catch(err => {
			console.log(err);
		})

		event.preventDefault();
	}

	getBusinessesStaff() {
		// GET request to our server
		axios({
			method: 'GET',
			url: `/api/businesses/${this.props.match.params.businessId}/staff`
		}).then(data => {
			this.setState({
				businessesStaff: data.data.data,
				dataLoaded: true
			});
		}).catch(err => {
			console.log(err);
		});
	}

	renderBusinessesStaff() {
		if (this.state.dataLoaded) {
			if(this.state.businessesStaff.length == 0) {
				return (
					<h3>You have no staff assigned to this business currently.</h3>
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
						{this.state.businessesStaff.map(staff => {
							return (
								<tr key={staff.staff_id}>
									<td>{staff.email}</td>
									<td>{staff.first_name}</td>
									<td>{staff.last_name}</td>
									<td>{staff.position}</td>
									<td>{staff.business_name}</td>
									<td>{staff.phone}</td>
									<td>
										<button onClick={(e) => this.handleDelete(staff.staff_id, e)}>Delete</button>
										<button><Link to={`/businesses/${staff.business_id}/staff/${staff.staff_id}`}>More</Link></button>
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
		this.getBusinessesStaff();
	}

	render() {
		return (
			<div className="businesses-staff">
				{this.renderBusinessesStaff()}
				<br />
				<form className="center" onSubmit={this.handleSubmit}>
					<label>
						<input placeholder="Email" name="email" type="email" required
							value={this.state.email}
							onChange={this.handleInputChange} />
					</label>
					<label>
						<input placeholder="First Name" name="firstName" type="text" required
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
							<option value="">Position</option>
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
					<input type="submit" value="Add new" />
				</form>
				<br />
				<Link className="back" to={`/businesses/${this.props.match.params.businessId}`}>Back</Link>
			</div>
		)
	}
};

export default BusinessesStaff;