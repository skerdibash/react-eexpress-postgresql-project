// controllers/business-controller.js

// Import the Business model.
const Business = require('../models/business');

// Instantiate the controller object
const BusinessController = {};

// Controller method for handling a request for getAll
BusinessController.getAll = (req, res) => {
	// Uses the getAll method from Business
	Business.getAll().then(businesses => {
		// Sends the businesses as a JSON object
		res.json({
			message: 'Success',
			data: businesses
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Controller method for handling a request for getAll
BusinessController.getById = (req, res) => {
	// Uses the getAll method from Business
	Business.getById(req.params.businessId).then(business => {
		// Sends the businesses as a JSON object
		res.json({
			message: 'Success',
			data: business
		});
	}).catch(err => {
		// If something goes wrong it logs the error in the console and sends it as a JSON object
		console.log(err);
		res.status(500).json({ err });
	});
};

// Controller method for handling a request for create
BusinessController.create = (req, res) => {

	if(req.params["type"] === undefined) {
		req.params.type = "";
	}

	// Uses the getAll method from Business
	Business.create(req.params.name, req.params.location, req.params.type).then(() => {
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
BusinessController.update = (req, res) => {

	if(req.params["type"] === undefined) {
		req.params.type = "";
	}

	// Uses the update method from Business
	Business.update(req.params.name, req.params.location, req.params.type, req.params.businessId).then(() => {
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
BusinessController.remove = (req, res) => {
	// Uses the remove method from Business
	Business.remove(req.params.businessId).then(() => {
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
module.exports = BusinessController;