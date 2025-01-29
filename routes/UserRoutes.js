const express = require("express");
const router = express.Router();
// import the userController
const userController = require("../controllers/UserController");
// import the userValidation middleware to validate the user input data
const authMiddleware  = require("../middleware/UserValidation");
// Sample route
router.get("/", (req, res) => {
  res.json({ message: "User route working!" });
});

module.exports = router;
