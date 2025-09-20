const express = require('express');
const router = express.Router(); // creamos el router para reportes de progreso

// Datos simulados de reportes
const reports = [
  { id: 401, user_id: 1, generated_at: "2025-09-25", completed_workouts: 15, total_hours: 22, notes: "Mejora en fuerza" },
  { id: 402, user_id: 2, generated_at: "2025-09-26", completed_workouts: 10, total_hours: 12, notes: "Avance en resistencia" }
];

// GET /v1/reports -> lista todos los reportes
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: reports });
});

// GET /v1/reports/:id -> obtiene un reporte por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const report = reports.find(r => r.id === id);

  if (!report) {
    return res.status(404).json({ error: true, message: 'Reporte no encontrado' });
  }

  res.status(200).json({ success: true, data: report });
});

module.exports = router;
