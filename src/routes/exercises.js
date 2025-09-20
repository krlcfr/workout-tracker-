const express = require("express");
const router = express.Router();

// Simulación de datos
const exercises = [
  { id: 1, name: "Sentadillas", category: "fuerza" },
  { id: 2, name: "Correr", category: "cardio" },
  { id: 3, name: "Flexiones", category: "fuerza" }
];

// GET ejercicios con filtro por categoría
router.get("/", (req, res) => {
  const { category } = req.query;

  let result = exercises;

  if (category) {
    result = exercises.filter(e => e.category === category);
  }

  res.json(result);
});

// GET ejercicio por ID con validación
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser numérico" });
  }

  const exercise = exercises.find(e => e.id === id);

  if (!exercise) {
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  res.json(exercise);
});

module.exports = router;
