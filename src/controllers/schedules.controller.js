const { sendSuccess, sendError } = require("../helpers/apiResponse");
const { schedules, plans } = require("../database/db");

const controller = {};

// GET: listar horarios
controller.getSchedules = (req, res) => {
  return sendSuccess(res, [...schedules], "Horarios obtenidos correctamente", 200);
};

// GET: horario por id
controller.getScheduleById = (req, res) => {
  const id = parseInt(req.params.id);
  const schedule = schedules.find(s => s.id === id);

  if (!schedule) return sendError(res, "Horario no encontrado", 404);

  return sendSuccess(res, schedule, "Horario encontrado", 200);
};

// POST: crear horario
controller.createSchedule = (req, res) => {
  const { plan_id, scheduled_date, scheduled_time, status } = req.body;

  if (!plan_id || !scheduled_date || !scheduled_time) {
    return sendError(
      res,
      "Faltan campos obligatorios (plan_id, scheduled_date, scheduled_time)",
      400
    );
  }

  // Validar que el plan exista
  const planExists = plans.some(p => p.id === plan_id);
  if (!planExists) {
    return sendError(res, "El plan especificado no existe", 404);
  }

  const newId = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;

  const newSchedule = {
    id: newId,
    plan_id,
    scheduled_date,
    scheduled_time,
    status: status || "pendiente" // Valor por defecto
  };

  schedules.push(newSchedule);

  return sendSuccess(res, newSchedule, "Horario creado", 201);
};

// PUT: actualizar horario completo
controller.updateSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const { plan_id, scheduled_date, scheduled_time, status } = req.body;
  const index = schedules.findIndex(s => s.id === id);

  if (index === -1) return sendError(res, "Horario no encontrado", 404);

  if (!plan_id || !scheduled_date || !scheduled_time || !status) {
    return sendError(res, "Faltan todos los campos obligatorios", 400);
  }

  schedules[index] = {
    id,
    plan_id,
    scheduled_date,
    scheduled_time,
    status
  };

  return sendSuccess(res, schedules[index], "Horario actualizado", 200);
};

// PATCH: actualización parcial (ej. solo cambiar status)
controller.patchSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const { plan_id, scheduled_date, scheduled_time, status } = req.body;
  const schedule = schedules.find(s => s.id === id);

  if (!schedule) return sendError(res, "Horario no encontrado", 404);

  if (plan_id) schedule.plan_id = plan_id;
  if (scheduled_date) schedule.scheduled_date = scheduled_date;
  if (scheduled_time) schedule.scheduled_time = scheduled_time;
  if (status) schedule.status = status;

  return sendSuccess(res, schedule, "Horario actualizado parcialmente", 200);
};

// DELETE: eliminar horario
controller.deleteSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const index = schedules.findIndex(s => s.id === id);

  if (index === -1) return sendError(res, "Horario no encontrado", 404);

  const deletedSchedule = schedules[index];
  schedules.splice(index, 1);
  return sendSuccess(res, deletedSchedule, "Horario eliminado", 200);
};

module.exports = controller;
