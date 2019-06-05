# react-express-postgresql-project

Project using react express postgresql, implemented as part of an interview process in a timespan of a 5 days.

## Install nodejs

`curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh1`

`sudo bash nodesource_setup.sh`

`sudo apt-get install nodejs`

### Install node modules

`npm install`

## Install postgresql

`sudo apt-get install postgresql postgresql-contrib`

### Create a new user

As a password use: password

`sudo -u postgres createuser -s vagrant -P`

### Create a new databse

`sudo -u postgres creatdb project_db`

### Initialize the databse

`psql -d project_db -f db/init.sql`



