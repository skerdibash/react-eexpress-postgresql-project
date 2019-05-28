// controllers/staff-controller.js

// Import the Staff model.
const Staff = require('../models/staff');

// Instantiate the controller object
const StaffController = {};

// Controller method for handling a request for getAll
StaffController.getAll = (req, res) => {
	// Uses the getAll method from Staff
	Staff.getAll(req.params.businessId).then(staff => {
		// Sends the staffes as a JSON object
		res.json({
			message: 'Success',
			data: staff
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Controller method for handling a request for getAll
StaffController.getById = (req, res) => {
	// Uses the getAll method from Business
	Staff.getById(req.params.staffId).then(staff => {
		// Sends the businesses as a JSON object
		res.json({
			message: 'Success',
			data: staff
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Controller method for handling a request for create
StaffController.create = (req, res) => {

	if(req.params["phone"] === undefined) {
		req.params.phone = "";
	}

	// Uses the getAll method from Staff
	Staff.create(req.params.businessId, req.params.email, req.params.firstName, req.params.lastName, req.params.position, req.params.phone).then(() => {
		res.json({
			message: 'Success'
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Controller method for handling a request for update
StaffController.update = (req, res) => {

	if(req.params["phone"] === undefined) {
		req.params.phone = "";
	}

	// Uses the update method from Staff
	Staff.update(req.params.email, req.params.firstName, req.params.lastName, req.params.position, req.params.phone, req.params.staffId).then(() => {
		res.json({
			message: 'Success'
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Controller method for handling a request for remove
StaffController.remove = (req, res) => {
	// Uses the remove method from Staff
	Staff.remove(req.params.staffId).then(() => {
		res.json({
			message: 'Success'
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Export the controller
module.exports = StaffController;