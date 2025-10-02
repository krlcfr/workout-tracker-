const { sendSuccess, sendError } = require("../helpers/apiResponse");
const { reports, users } = require("../database/db");

const controller = {};

// GET: listar reportes
controller.getReports = (req, res) => {
  return sendSuccess(res, [...reports], "Reportes obtenidos correctamente", 200);
};

// GET: reporte por id
controller.getReportById = (req, res) => {
  const id = parseInt(req.params.id);
  const report = reports.find(r => r.id === id);

  if (!report) return sendError(res, "Reporte no encontrado", 404);

  return sendSuccess(res, report, "Reporte encontrado", 200);
};

// POST: crear reporte (normalmente esto sería un proceso automático)
controller.createReport = (req, res) => {
  const { user_id, completed_workouts, total_hours, notes } = req.body;

  if (!user_id || completed_workouts === undefined || total_hours === undefined) {
    return sendError(
      res,
      "Faltan campos obligatorios (user_id, completed_workouts, total_hours)",
      400
    );
  }

  // Validar que el usuario exista
  const userExists = users.some(u => u.id === user_id);
  if (!userExists) {
    return sendError(res, "El usuario especificado no existe", 404);
  }

  const newId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;

  const newReport = {
    id: newId,
    user_id,
    generated_at: new Date().toISOString().split("T")[0], // Fecha actual
    completed_workouts,
    total_hours,
    notes: notes || ""
  };

  reports.push(newReport);

  return sendSuccess(res, newReport, "Reporte creado", 201);
};

// PUT: actualizar reporte
controller.updateReport = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, completed_workouts, total_hours, notes } = req.body;
  const index = reports.findIndex(r => r.id === id);

  if (index === -1) return sendError(res, "Reporte no encontrado", 404);

  if (!user_id || completed_workouts === undefined || total_hours === undefined) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  reports[index] = {
    ...reports[index], // Mantiene generated_at original
    user_id,
    completed_workouts,
    total_hours,
    notes: notes || reports[index].notes
  };

  return sendSuccess(res, reports[index], "Reporte actualizado", 200);
};

// PATCH: actualización parcial
controller.patchReport = (req, res) => {
  const id = parseInt(req.params.id);
  const { completed_workouts, total_hours, notes } = req.body;
  const report = reports.find(r => r.id === id);

  if (!report) return sendError(res, "Reporte no encontrado", 404);

  if (completed_workouts !== undefined) report.completed_workouts = completed_workouts;
  if (total_hours !== undefined) report.total_hours = total_hours;
  if (notes) report.notes = notes;

  return sendSuccess(res, report, "Reporte actualizado parcialmente", 200);
};

// DELETE: eliminar reporte
controller.deleteReport = (req, res) => {
  const id = parseInt(req.params.id);
  const index = reports.findIndex(r => r.id === id);

  if (index === -1) return sendError(res, "Reporte no encontrado", 404);

  const deletedReport = reports[index];
  reports.splice(index, 1);
  return sendSuccess(res, deletedReport, "Reporte eliminado", 200);
};

module.exports = controller;
