const express = require("express");
const router = express.Router();

const schedules = [
  { id: 1, plan_id: 1, date: "2025-09-20", status: "pendiente" },
  { id: 2, plan_id: 1, date: "2025-09-21", status: "completado" }
];

// GET todos los schedules
router.get("/", (req, res) => {
  res.json(schedules);
});

// GET headers demo
router.get("/headers-demo", (req, res) => {
  const lang = req.get("Accept-Language") || "no especificado";

  res.set("X-API-Environment", "development");
  res.json({
    "Accept-Language recibido": lang,
    mensaje: "Cabeceras de schedules configuradas"
  });
});

// GET schedule por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const schedule = schedules.find(s => s.id === parseInt(id));

  if (!schedule) {
    return res.status(404).json({ error: "Schedule no encontrado" });
  }

  res.json(schedule);
});

// POST schedule
router.post("/", (req, res) => {
  const { plan_id, date, status } = req.body;

  if (!plan_id || !date || !status) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newSchedule = { id: schedules.length + 1, plan_id: parseInt(plan_id), date, status };
  schedules.push(newSchedule);

  res.status(201).json(newSchedule);
});

module.exports = router;
