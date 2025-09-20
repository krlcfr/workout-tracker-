const express = require("express");
const router = express.Router();

// Simulación de ejercicios
const exercises = [
  { id: 1, name: "Sentadillas", category: "fuerza" },
  { id: 2, name: "Correr", category: "cardio" }
];

// GET headers demo
router.get("/headers", (req, res) => {
  // Leer cabecera Authorization
  const auth = req.get("Authorization") || "sin token";
  res.json({ "Authorization recibido": auth });
});

// POST ejercicio con req.body
router.post("/", (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newExercise = {
    id: exercises.length + 1,
    name,
    category
  };

  exercises.push(newExercise);

  res.status(201).json(newExercise);
});

module.exports = router;
