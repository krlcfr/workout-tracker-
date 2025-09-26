const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const users = [
  { id: 1, name: "Santiago", role: "admin" },
  { id: 2, name: "Estefa", role: "user" }
];

// GET todos los usuarios
router.get("/", (req, res) => {
  try {
    return sendSuccess(res, users, 200);
  } catch (err) {
    return sendError(res, 500, "Error al obtener usuarios", "INTERNAL_ERROR");
  }
});

// GET usuario por ID
router.get("/:id", (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return sendError(res, 404, "Usuario no encontrado", "USER_NOT_FOUND");
    return sendSuccess(res, user, 200);
  } catch (err) {
    return sendError(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// POST usuario
router.post("/", (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name || !role) return sendError(res, 400, "Faltan campos obligatorios", "VALIDATION_ERROR");

    const newUser = { id: users.length + 1, name, role };
    users.push(newUser);

    return sendSuccess(res, newUser, 201);
  } catch (err) {
    return sendError(res, 500, "Error al crear usuario", "INTERNAL_ERROR");
  }
});

module.exports = router;
