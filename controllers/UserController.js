// these component used to "for big project there is MVC...the arctict folder structure module(database),view(front end or cliant),controller" found in back-end and communicate with database

// Import dbconfig
const dbconnection = require("../db/dbConfig");

// Example function to get users
function getUsers(req, res) {
  dbconnection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

// Export the function to be used in routes
module.exports = {
  getUsers
};