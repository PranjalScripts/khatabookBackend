const express = require("express");
const router = express.Router();
const { getTransactions } = require("../../controllers/collaborativeBookController/collaborativeBookController"); // Import the controller
const authenticateUser = require("../../middleware/authMiddleware"); // Middleware to authenticate

// Route to fetch transactions
router.get("/transactions", authenticateUser, getTransactions);

module.exports = router;
