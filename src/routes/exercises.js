const express = require('express');
const router = express.Router(); // creamos el router para ejercicios

// Datos simulados de ejercicios
const exercises = [
  { id: 1, name: "Press banca", description: "Ejercicio de fuerza para el pecho", category: "fuerza", muscle_group: "pecho" },
  { id: 2, name: "Correr", description: "Ejercicio cardiovascular", category: "cardio", muscle_group: "piernas" }
];

// GET /v1/exercises -> lista todos los ejercicios
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: exercises });
});

// GET /v1/exercises/:id -> obtiene un ejercicio por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) {
    return res.status(404).json({ error: true, message: 'Ejercicio no encontrado' });
  }

  res.status(200).json({ success: true, data: exercise });
});

module.exports = router;
