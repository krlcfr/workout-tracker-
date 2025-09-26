const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");


const reports = [
  { id: 1, user_id: 1, date: "2025-09-01", progress: "Buen avance" },
  { id: 2, user_id: 2, date: "2025-09-15", progress: "Inicio de plan" }
];

// GET listar todos
router.get("/", (req, res) => {
  return sendSuccess(res, reports);
});

// GET reporte por ID
router.get("/:id", (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return sendError(res, "Reporte no encontrado", 404);
  return sendSuccess(res, report);
});

// POST crear reporte
router.post("/", (req, res) => {
  const { user_id, date, progress } = req.body;

  if (!user_id || !date || !progress) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  const newReport = {
    id: reports.length + 1,
    user_id: parseInt(user_id),
    date,
    progress
  };

  reports.push(newReport);
  return sendSuccess(res, newReport, 201);
});

// GET cabeceras demo
router.get("/headers-demo", (req, res) => {
  const token = req.get("Authorization") || "sin token";
  res.set("X-Security-Level", "high");
  res.json({
    "Authorization recibido": token
  });
});

module.exports = router;
