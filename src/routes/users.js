const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");


// Simulación de usuarios
const users = [
  { id: 1, name: "Santiago", role: "admin" },
  { id: 2, name: "Estefa", role: "user" }
];

// GET listar todos
router.get("/", (req, res) => {
  return sendSuccess(res, users);
});

// GET usuario por ID
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return sendError(res, "Usuario no encontrado", 404);
  return sendSuccess(res, user);
});

// POST crear usuario
router.post("/", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  const newUser = {
    id: users.length + 1,
    name,
    role
  };

  users.push(newUser);
  return sendSuccess(res, newUser, 201);
});

// GET cabeceras demo
router.get("/headers-demo", (req, res) => {
  const contentType = req.get("Content-Type") || "no especificado";
  res.set("X-Powered-By", "WorkoutTrackerAPI");
  res.json({
    "Content-Type recibido": contentType
  });
});

module.exports = router;
