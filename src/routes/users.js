const express = require("express");
const router = express.Router();

// Simulación de usuarios
const users = [
  { id: 1, name: "Santiago", role: "admin" },
  { id: 2, name: "Estefa", role: "user" }
];

// GET todos los usuarios
router.get("/", (req, res) => {
  res.json(users);
});

// GET headers
router.get("/headers", (req, res) => {
  const contentType = req.get("Content-Type") || "no especificado";
  res.json({ "Content-Type recibido": contentType });
});

// GET headers demo
router.get("/headers-demo", (req, res) => {
  const contentType = req.get("Content-Type") || "no especificado";
  const apiKey = req.get("X-API-Key") || "no enviada";

  res.set("X-Powered-By", "WorkoutTrackerAPI");
  res.json({
    "Content-Type recibido": contentType,
    "X-API-Key recibido": apiKey
  });
});

// GET usuario por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
});

// POST usuario
router.post("/", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;
