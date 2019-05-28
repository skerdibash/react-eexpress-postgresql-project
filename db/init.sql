-- db/migrations/migration.sql

DROP TABLE IF EXISTS staff;

DROP TABLE IF EXISTS businesses;

CREATE TABLE IF NOT EXISTS businesses (
	business_id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	location TEXT NOT NULL,
	type TEXT CHECK(type = 'Bar' OR type = 'Restaurant' OR type = 'Club' OR type = 'Hotel' OR type = 'Cafe' OR type = '')
);

CREATE TABLE IF NOT EXISTS staff (
	staff_id BIGSERIAL PRIMARY KEY,
	business_id BIGINT REFERENCES businesses(business_id) NOT NULL,
	email TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	position TEXT NOT NULL CHECK(position = 'Kitchen' OR position = 'Service' OR position = 'PR'),
	business_name TEXT NOT NULL,
	phone TEXT
);