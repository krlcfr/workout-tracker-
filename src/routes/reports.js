const express = require("express");
const router = express.Router();

// Simulación de datos
const reports = [
  { id: 1, user_id: 1, date: "2025-09-01", progress: "Buen avance" },
  { id: 2, user_id: 1, date: "2025-09-15", progress: "Mantenimiento" },
  { id: 3, user_id: 2, date: "2025-09-10", progress: "Inicio de plan" }
];

// GET reportes con filtro opcional por user_id y rango de fechas
router.get("/", (req, res) => {
  const { user_id, from, to } = req.query;
  let result = reports;

  if (user_id) {
    result = result.filter(r => r.user_id === parseInt(user_id));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    result = result.filter(r => {
      const reportDate = new Date(r.date);
      return reportDate >= fromDate && reportDate <= toDate;
    });
  }

  res.json(result);
});

// GET reporte por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser numérico" });
  }

  const report = reports.find(r => r.id === id);

  if (!report) {
    return res.status(404).json({ error: "Reporte no encontrado" });
  }

  res.json(report);
});

module.exports = router;
