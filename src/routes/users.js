const express = require('express');
const router = express.Router(); // creamos el router para usuarios

// Datos simulados de usuarios (mock data)
const users = [
  { id: 1, name: "Santiago", email: "santi@example.com", role: "user", registered_at: "2025-09-13" },
  { id: 2, name: "Ana", email: "ana@example.com", role: "admin", registered_at: "2025-09-10" }
];

// GET /v1/users -> lista todos los usuarios
router.get('/', (req, res) => {
  // respondemos con el array completo en formato JSON
  res.status(200).json({ success: true, data: users });
});

// GET /v1/users/:id -> obtiene un usuario por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id); // convertimos el parámetro a número
  const user = users.find(u => u.id === id); // buscamos el usuario en el array

  // si no se encuentra, devolvemos error 404
  if (!user) {
    return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
  }

  // si existe, devolvemos el usuario
  res.status(200).json({ success: true, data: user });
});

module.exports = router; // exportamos el router para usarlo en app.js
