const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser

} = require("../../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;
