const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser

} = require("../../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);

module.exports = router;
