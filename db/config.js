// db/config.js

const options = {
	query: (e) => {
		console.log(e.query)
	}
}

const pgp = require('pg-promise')(options);

const setDataBase = () => {
	if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
		return pgp({
			database: 'project_db',
			port: 5432,
			host: 'localhost',
			password: 'password'
		})
	}
	else if (process.env.NODE_ENV === 'production') {
		return pgp(process.env.DATABASE_URL)
	}
}

const db = setDataBase();
module.exports = db;