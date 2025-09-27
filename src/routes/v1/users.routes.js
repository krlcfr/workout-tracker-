const express = require("express");
const {
  getUsers,
  getUserById
} = require("../../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;
