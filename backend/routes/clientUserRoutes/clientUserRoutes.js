const express = require("express");
const router = express.Router();
const {
  createClientUser,
  getAllClientUsers,
  getClientUserById,
  updateClientUser,
  deleteClientUser,
} = require("../../controllers/clientUserController/clientUserController");

const authenticate = require("../../middleware/authMiddleware");



router.post("/create-client", authenticate, createClientUser);
router.get("/get-client", authenticate, getAllClientUsers);
router.get("/get-clientUserById:id", authenticate, getClientUserById);
router.put("update-client/:id", authenticate, updateClientUser);
router.delete("delete-client/:id", authenticate, deleteClientUser);

module.exports = router;
