const { sendSuccess, sendError } = require("../helpers/apiResponse");
const { plans, users, exercises } = require("../database/db");

const controller = {};

// GET: listar planes
controller.getPlans = (req, res) => {
  // Por ahora, simplemente devuelve todos los planes.
  // En el futuro se podría agregar un filtro.
  return sendSuccess(res, [...plans], "Planes obtenidos correctamente", 200);
};

// GET: plan por id
controller.getPlanById = (req, res) => {
  const id = parseInt(req.params.id);
  const plan = plans.find(p => p.id === id);

  if (!plan) return sendError(res, "Plan no encontrado", 404);

  return sendSuccess(res, plan, "Plan encontrado", 200);
};

// POST: crear plan
controller.createPlan = (req, res) => {
  const { user_id, exercises: planExercises, notes } = req.body;

  if (!user_id || !planExercises || !Array.isArray(planExercises) || planExercises.length === 0) {
    return sendError(
      res,
      "Faltan campos obligatorios o el formato es incorrecto (user_id, exercises)",
      400
    );
  }

  // Validar que el usuario exista
  const userExists = users.some(u => u.id === user_id);
  if (!userExists) {
    return sendError(res, "El usuario especificado no existe", 404);
  }

  // Validar que todos los ejercicios del plan existan
  for (const ex of planExercises) {
    const exerciseExists = exercises.some(e => e.id === ex.exercise_id);
    if (!exerciseExists) {
      return sendError(res, `El ejercicio con id ${ex.exercise_id} no existe`, 404);
    }
  }

  const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;

  const newPlan = {
    id: newId,
    user_id,
    exercises: planExercises,
    notes: notes || ""
  };

  plans.push(newPlan);

  return sendSuccess(res, newPlan, "Plan creado", 201);
};

// PUT: actualizar plan completo
controller.updatePlan = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, exercises: planExercises, notes } = req.body;
  const index = plans.findIndex(p => p.id === id);

  if (index === -1) return sendError(res, "Plan no encontrado", 404);

  if (!user_id || !planExercises || !Array.isArray(planExercises) || planExercises.length === 0) {
    return sendError(res, "Faltan campos obligatorios o el formato es incorrecto", 400);
  }

  plans[index] = {
    id,
    user_id,
    exercises: planExercises,
    notes: notes || plans[index].notes
  };

  return sendSuccess(res, plans[index], "Plan actualizado", 200);
};

// PATCH: actualización parcial
controller.patchPlan = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, exercises: planExercises, notes } = req.body;
  const plan = plans.find(p => p.id === id);

  if (!plan) return sendError(res, "Plan no encontrado", 404);

  if (user_id) plan.user_id = user_id;
  if (planExercises) plan.exercises = planExercises;
  if (notes) plan.notes = notes;

  return sendSuccess(res, plan, "Plan actualizado parcialmente", 200);
};

// DELETE: eliminar plan
controller.deletePlan = (req, res) => {
  const id = parseInt(req.params.id);
  const index = plans.findIndex(p => p.id === id);

  if (index === -1) return sendError(res, "Plan no encontrado", 404);

  const deletedPlan = plans[index];
  plans.splice(index, 1);
  return sendSuccess(res, deletedPlan, "Plan eliminado", 200);
};

module.exports = controller;
