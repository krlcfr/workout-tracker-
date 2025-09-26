const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const reports = [
  { id: 1, user_id: 1, date: "2025-09-01", progress: "Buen avance" },
  { id: 2, user_id: 2, date: "2025-09-15", progress: "Inicio de plan" }
];

// GET todos los reports
router.get("/", (req, res) => {
  try {
    return sendSuccess(res, reports, 200);
  } catch (err) {
    return sendError(res, 500, "Error al obtener reports", "INTERNAL_ERROR");
  }
});

// GET report por ID
router.get("/:id", (req, res) => {
  try {
    const report = reports.find(r => r.id === parseInt(req.params.id));
    if (!report) return sendError(res, 404, "Reporte no encontrado", "REPORT_NOT_FOUND");
    return sendSuccess(res, report, 200);
  } catch (err) {
    return sendError(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// POST reporte
router.post("/", (req, res) => {
  try {
    const { user_id, date, progress } = req.body;
    if (!user_id || !date || !progress) return sendError(res, 400, "Faltan campos obligatorios", "VALIDATION_ERROR");

    const newReport = { id: reports.length + 1, user_id: parseInt(user_id), date, progress };
    reports.push(newReport);

    return sendSuccess(res, newReport, 201);
  } catch (err) {
    return sendError(res, 500, "Error al crear reporte", "INTERNAL_ERROR");
  }
});

module.exports = router;
