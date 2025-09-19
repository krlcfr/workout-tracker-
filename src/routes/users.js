const express = require('express');
const router = express.Router();

// Datos temporales simulados
const users = [
  { id: 1, name: 'Santiago', email: 'santi@example.com' },
  { id: 2, name: 'Ana', email: 'ana@example.com' }
];

// GET /v1/users -> listar todos los usuarios
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: users });
});

// GET /v1/users/:id -> obtener un usuario por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
  }
  res.status(200).json({ success: true, data: user });
});

module.exports = router;
