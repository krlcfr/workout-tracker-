const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");


const schedules = [
  { id: 1, plan_id: 1, date: "2025-09-20", status: "pendiente" },
  { id: 2, plan_id: 1, date: "2025-09-21", status: "completado" }
];

// GET listar todos
router.get("/", (req, res) => {
  return sendSuccess(res, schedules);
});

// GET schedule por ID
router.get("/:id", (req, res) => {
  const schedule = schedules.find(s => s.id === parseInt(req.params.id));
  if (!schedule) return sendError(res, "Schedule no encontrado", 404);
  return sendSuccess(res, schedule);
});

// POST crear schedule
router.post("/", (req, res) => {
  const { plan_id, date, status } = req.body;

  if (!plan_id || !date || !status) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  const newSchedule = {
    id: schedules.length + 1,
    plan_id: parseInt(plan_id),
    date,
    status
  };

  schedules.push(newSchedule);
  return sendSuccess(res, newSchedule, 201);
});

// GET cabeceras demo
router.get("/headers-demo", (req, res) => {
  const lang = req.get("Accept-Language") || "no especificado";
  res.set("X-API-Environment", "development");
  res.json({
    "Accept-Language recibido": lang
  });
});

module.exports = router;
