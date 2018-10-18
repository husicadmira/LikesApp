# NodeTestApplication

In order to run application install needed dependencies:

npm install -g sails

npm install

# Seting up DataBase

Create database datadb and testdb on your mysql server, and change database connection parameters in /config/datastores.js

In order to do the integration testing import data provided in /database/testing.sql file.

# Run app

sails lift

# Run tests 

npm test
