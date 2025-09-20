const express = require('express');
const router = express.Router(); // creamos el router para planes de entrenamiento

// Datos simulados de planes de entrenamiento
const plans = [
  { id: 201, user_id: 1, exercises: [{ exercise_id: 1, sets: 4, reps: 12, weight: 40 }], notes: "Plan inicial de fuerza" },
  { id: 202, user_id: 2, exercises: [{ exercise_id: 2, sets: 3, reps: 20, weight: null }], notes: "Plan de cardio" }
];

// GET /v1/plans -> lista todos los planes
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: plans });
});

// GET /v1/plans/:id -> obtiene un plan por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const plan = plans.find(p => p.id === id);

  if (!plan) {
    return res.status(404).json({ error: true, message: 'Plan no encontrado' });
  }

  res.status(200).json({ success: true, data: plan });
});

module.exports = router;
