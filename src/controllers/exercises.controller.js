const { sendSuccess, sendError } = require("../helpers/apiResponse");
const { exercises } = require("../database/db");

const controller = {};

// GET: listar ejercicios con filtro de búsqueda
controller.getExercises = (req, res) => {
  const { search } = req.query;
  let filtered = [...exercises];

  if (search) {
    filtered = filtered.filter(
      e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  return sendSuccess(res, filtered, "Ejercicios obtenidos correctamente", 200);
};

// GET: ejercicio por id
controller.getExerciseById = (req, res) => {
  const id = parseInt(req.params.id);
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) return sendError(res, "Ejercicio no encontrado", 404);

  return sendSuccess(res, exercise, "Ejercicio encontrado", 200);
};

// POST: crear ejercicio
controller.createExercise = (req, res) => {
  const { name, description, category, muscle_group } = req.body;
  if (!name || !description || !category || !muscle_group) {
    return sendError(
      res,
      "Faltan campos obligatorios (name, description, category, muscle_group)",
      400
    );
  }

  const newId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;

  const newExercise = {
    id: newId,
    name,
    description,
    category,
    muscle_group
  };

  exercises.push(newExercise);

  return sendSuccess(res, newExercise, "Ejercicio creado", 201);
};

// PUT: actualizar ejercicio completo
controller.updateExercise = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, category, muscle_group } = req.body;
  const index = exercises.findIndex(e => e.id === id);

  if (index === -1) return sendError(res, "Ejercicio no encontrado", 404);
  if (!name || !description || !category || !muscle_group) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  exercises[index] = { id, name, description, category, muscle_group };

  return sendSuccess(res, exercises[index], "Ejercicio actualizado", 200);
};

// PATCH: actualización parcial
controller.patchExercise = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, category, muscle_group } = req.body;
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) return sendError(res, "Ejercicio no encontrado", 404);

  if (name) exercise.name = name;
  if (description) exercise.description = description;
  if (category) exercise.category = category;
  if (muscle_group) exercise.muscle_group = muscle_group;

  return sendSuccess(res, exercise, "Ejercicio actualizado parcialmente", 200);
};

// DELETE: eliminar ejercicio
controller.deleteExercise = (req, res) => {
  const id = parseInt(req.params.id);
  const index = exercises.findIndex(e => e.id === id);

  if (index === -1) return sendError(res, "Ejercicio no encontrado", 404);

  const deletedExercise = exercises[index];
  exercises.splice(index, 1);

  return sendSuccess(res, deletedExercise, "Ejercicio eliminado", 200);
};

module.exports = controller;
