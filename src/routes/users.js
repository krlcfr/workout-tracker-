const express = require("express");
const router = express.Router();

// Simulación de datos
const users = [
  { id: 1, name: "Santiago", role: "admin" },
  { id: 2, name: "Estefa", role: "user" },
  { id: 3, name: "Andrés", role: "user" }
];

// GET todos los usuarios con filtro opcional por rol
router.get("/", (req, res) => {
  const { role } = req.query;

  let result = users;

  if (role) {
    result = users.filter(u => u.role === role);
  }

  res.json(result);
});

// GET usuario por ID con validación
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser numérico" });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
});

module.exports = router;
