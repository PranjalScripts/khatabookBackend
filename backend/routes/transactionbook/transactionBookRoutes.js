// transactionBookRoutes.js
const express = require("express");
const {
  createTransactionBook,
  getTransactionBook,
  editTransactionBook,
  deleteTransactionBook,
  getAllTransactionBooks,
} = require("../../controllers/bookController/transactionBookController");

const router = express.Router();

router.post("/create-book", createTransactionBook);
router.get("/get-book/:id", getTransactionBook);
router.put("/update-book/:id", editTransactionBook);
router.delete("/delete-book/:id", deleteTransactionBook);
router.get("/getAll-books", getAllTransactionBooks);
module.exports = router;
