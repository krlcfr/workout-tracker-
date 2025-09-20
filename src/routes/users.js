const express = require("express");
const router = express.Router();

// Simulación de usuarios
const users = [
  { id: 1, name: "Santiago", role: "admin" },
  { id: 2, name: "Estefa", role: "user" }
];

// GET headers demo
router.get("/headers", (req, res) => {
  // Leer cabecera Content-Type
  const contentType = req.get("Content-Type") || "no especificado";
  res.json({ "Content-Type recibido": contentType });
});

// POST usuario con req.body
router.post("/", (req, res) => {
  const { name, role } = req.body;

  // Validación básica
  if (!name || !role) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role
  };

  users.push(newUser);

  // Responder con 201 Created
  res.status(201).json(newUser);
});

module.exports = router;
