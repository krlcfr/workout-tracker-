const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const schedules = [
  { id: 1, plan_id: 1, date: "2025-09-20", status: "pendiente" },
  { id: 2, plan_id: 1, date: "2025-09-21", status: "completado" }
];

// GET todos los schedules
router.get("/", (req, res) => {
  try {
    return sendSuccess(res, schedules, 200);
  } catch (err) {
    return sendError(res, 500, "Error al obtener schedules", "INTERNAL_ERROR");
  }
});

// GET schedule por ID
router.get("/:id", (req, res) => {
  try {
    const schedule = schedules.find(s => s.id === parseInt(req.params.id));
    if (!schedule) return sendError(res, 404, "Schedule no encontrado", "SCHEDULE_NOT_FOUND");
    return sendSuccess(res, schedule, 200);
  } catch (err) {
    return sendError(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// POST schedule
router.post("/", (req, res) => {
  try {
    const { plan_id, date, status } = req.body;
    if (!plan_id || !date || !status) return sendError(res, 400, "Faltan campos obligatorios", "VALIDATION_ERROR");

    const newSchedule = { id: schedules.length + 1, plan_id: parseInt(plan_id), date, status };
    schedules.push(newSchedule);

    return sendSuccess(res, newSchedule, 201);
  } catch (err) {
    return sendError(res, 500, "Error al crear schedule", "INTERNAL_ERROR");
  }
});

module.exports = router;
