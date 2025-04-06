// Import the query function from the db.config.js file
const conn = require("../config/dbConfig");
// Import the fs module to read our sql file
const fs = require('fs');

// Write a function to create the database tables
async function install() {
    // Create a variable to hold the path to the sql file
    const queryFile = __dirname + '/sql/initial-queries.sql';
}