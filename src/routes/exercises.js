const express = require('express');
const router = express.Router();

// Datos temporales simulados
const exercises = [
  { id: 1, name: 'Press banca', category: 'fuerza' },
  { id: 2, name: 'Correr', category: 'cardio' }
];

// GET /v1/exercises -> listar todos los ejercicios
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: exercises });
});

// GET /v1/exercises/:id -> obtener ejercicio por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const exercise = exercises.find(e => e.id === id);
  if (!exercise) {
    return res.status(404).json({ error: true, message: 'Ejercicio no encontrado' });
  }
  res.status(200).json({ success: true, data: exercise });
});

module.exports = router;
