const express = require("express");
const router = express.Router();

const exercises = [
  { id: 1, name: "Sentadillas", category: "fuerza" },
  { id: 2, name: "Correr", category: "cardio" }
];

// GET todos los ejercicios
router.get("/", (req, res) => {
  res.json(exercises);
});

// GET headers
router.get("/headers", (req, res) => {
  const auth = req.get("Authorization") || "sin token";
  res.json({ "Authorization recibido": auth });
});

// GET headers demo
router.get("/headers-demo", (req, res) => {
  res.set("X-Powered-By", "WorkoutTrackerAPI");
  res.set("X-Security-Level", "high");

  res.json({ mensaje: "Cabeceras de ejercicios enviadas correctamente" });
});

// GET ejercicio por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find(e => e.id === parseInt(id));

  if (!exercise) {
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  res.json(exercise);
});

// POST ejercicio
router.post("/", (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newExercise = { id: exercises.length + 1, name, category };
  exercises.push(newExercise);

  res.status(201).json(newExercise);
});

module.exports = router;
