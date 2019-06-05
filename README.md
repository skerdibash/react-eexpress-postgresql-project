# react-express-postgresql-project

Project using react express postgresql, implemented as part of an interview process.

## Setting up the project

### Install nodejs

`curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh1`

`sudo bash nodesource_setup.sh`

`sudo apt-get install nodejs`

#### Install node modules

`npm install`

### Install postgresql

`sudo apt-get install postgresql postgresql-contrib`

#### Create a new user

As a password use: password

`sudo -u postgres createuser -s vagrant -P`

#### Create a new databse

`sudo -u postgres creatdb project_db`

#### Initialize the databse

`psql -d project_db -f db/init.sql`

## Runing the project

Project runs on port 3000 and if using Vagrant on address 192.168.68.8

`npm run build` 

`npm run start`



