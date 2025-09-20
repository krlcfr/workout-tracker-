const express = require('express');
const router = express.Router(); // creamos el router para entrenamientos programados

// Datos simulados de entrenamientos programados
const schedules = [
  { id: 301, plan_id: 201, scheduled_date: "2025-09-20", scheduled_time: "07:30", status: "pendiente" },
  { id: 302, plan_id: 202, scheduled_date: "2025-09-21", scheduled_time: "18:00", status: "completado" }
];

// GET /v1/schedules -> lista todos los entrenamientos programados
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: schedules });
});

// GET /v1/schedules/:id -> obtiene un entrenamiento programado por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const schedule = schedules.find(s => s.id === id);

  if (!schedule) {
    return res.status(404).json({ error: true, message: 'Entrenamiento no encontrado' });
  }

  res.status(200).json({ success: true, data: schedule });
});

module.exports = router;
