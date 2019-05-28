// models/business.js

// Import the database
const db = require('../db/config');

// Instantiate a new object.
// This will interface with the business database.
// Specifically, the businesses table.
const Business = {};

// Define methods for the Business object

// Returns all businesses
Business.getAll = () => {
	return db.query(
		`SELECT * FROM businesses`
	);
};

// Return one quote with the specific id
Business.getById = (businessId) => {
	return db.oneOrNone(
		`SELECT * FROM businesses WHERE business_id = $1`,
		[businessId]
	);
};

// Create a new business
Business.create = (name, location, type) => {
	return db.none(
		`INSERT INTO businesses(name, location, type) VALUES($1, $2, $3)`,
		[name, location, type]
	);
};

// Update an existing business
Business.update = (name, location, type, businessId) => {
	return db.none(
		`UPDATE staff SET business_name = $1 WHERE business_id = $2`,
		[name, businessId]
	).then(() => {
		return db.none(
			`UPDATE businesses SET name = $1, location = $2, type = $3 WHERE business_id = $4`,
			[name, location, type, businessId]
		);
	}).catch(err => {
		console.log(err);
	});
};

// Remove a business
Business.remove = (businessId) => {

	return db.none(
		`DELETE FROM staff where business_id = $1`,
		[businessId]
	).then(() => {
		return db.none(
			`DELETE FROM businesses where business_id = $1`,
			[businessId]
		);
	}).catch(err => {
		console.log(err);
	});

};

// Export the Quote object
module.exports = Business;