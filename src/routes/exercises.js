const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const exercises = [
  { id: 1, name: "Sentadillas", category: "fuerza" },
  { id: 2, name: "Correr", category: "cardio" }
];

// GET todos los ejercicios
router.get("/", (req, res) => {
  try {
    return sendSuccess(res, exercises, 200);
  } catch (err) {
    return sendError(res, 500, "Error al obtener ejercicios", "INTERNAL_ERROR");
  }
});

// GET ejercicio por ID
router.get("/:id", (req, res) => {
  try {
    const exercise = exercises.find(e => e.id === parseInt(req.params.id));
    if (!exercise) return sendError(res, 404, "Ejercicio no encontrado", "EXERCISE_NOT_FOUND");
    return sendSuccess(res, exercise, 200);
  } catch (err) {
    return sendError(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// POST ejercicio
router.post("/", (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) return sendError(res, 400, "Faltan campos obligatorios", "VALIDATION_ERROR");

    const newExercise = { id: exercises.length + 1, name, category };
    exercises.push(newExercise);

    return sendSuccess(res, newExercise, 201);
  } catch (err) {
    return sendError(res, 500, "Error al crear ejercicio", "INTERNAL_ERROR");
  }
});

module.exports = router;
