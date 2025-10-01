const express = require("express");
const router = express.Router();
const exercisesController = require("../../controllers/exercises.controller");

// CRUD ejercicios
router.get("/", exercisesController.getExercises);
router.get("/:id", exercisesController.getExerciseById);
router.post("/", exercisesController.createExercise);
router.put("/:id", exercisesController.updateExercise);
router.patch("/:id", exercisesController.patchExercise);
router.delete("/:id", exercisesController.deleteExercise);

module.exports = router;
