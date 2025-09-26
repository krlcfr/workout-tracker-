const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");


const exercises = [
  { id: 1, name: "Sentadillas", category: "fuerza" },
  { id: 2, name: "Correr", category: "cardio" }
];

// GET listar todos
router.get("/", (req, res) => {
  return sendSuccess(res, exercises);
});

// GET ejercicio por ID
router.get("/:id", (req, res) => {
  const exercise = exercises.find(e => e.id === parseInt(req.params.id));
  if (!exercise) return sendError(res, "Ejercicio no encontrado", 404);
  return sendSuccess(res, exercise);
});

// POST crear ejercicio
router.post("/", (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  const newExercise = {
    id: exercises.length + 1,
    name,
    category
  };

  exercises.push(newExercise);
  return sendSuccess(res, newExercise, 201);
});

// GET cabeceras demo
router.get("/headers-demo", (req, res) => {
  const auth = req.get("Authorization") || "no enviada";
  res.set("X-Powered-By", "WorkoutTrackerAPI");
  res.json({
    "Authorization recibido": auth
  });
});

module.exports = router;
