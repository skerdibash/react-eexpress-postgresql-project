// models/business.js

// Import the database
const db = require('../db/config');

// Instantiate a new object.
// This will interface with the business database.
// Specifically, the staff table.
const Staff = {};

// Define methods for the Staff object

// Returns all staff members of a business
Staff.getAll = (businessId) => {
	return db.query(
		`SELECT * FROM staff WHERE business_id = $1`,
		[businessId]
	);
};

// Return one quote with the specific id
Staff.getById = (staffId) => {
	return db.oneOrNone(
		`SELECT * FROM staff WHERE staff_id = $1`,
		[staffId]
	);
};

// Create a new staff member for a business
Staff.create = (businessId, email, firstName, lastName, position, phone) => {

	return db.oneOrNone(
		`SELECT * FROM businesses WHERE business_id = $1`,
		[businessId]
	).then(business => {
		return db.none(
			`INSERT INTO staff(business_id, email, first_name, last_name, position, business_name, phone) VALUES($1, $2, $3, $4, $5, $6, $7)`, 
			[businessId, email, firstName, lastName, position, business.name, phone]
		);
	}).catch(err => {
		console.log(err);
	});

};

// Update an existing business
Staff.update = (email, firstName, lastName, position, phone, staffId) => {
	return db.none(
		`UPDATE staff SET email = $1, first_name = $2, last_name = $3, position = $4, phone = $5 WHERE staff_id = $6`, 
		[email, firstName, lastName, position, phone, staffId]
	);
};

// Removes a staff member from a business
Staff.remove = (staffId) => {
	return db.none(
		`DELETE FROM staff where staff_id = $1`, 
		[staffId]
	);
};

// Export the Quote object
module.exports = Staff;