const express = require("express");
const router = express.Router();

// Simulación de datos
const schedules = [
  { id: 1, plan_id: 1, date: "2025-09-20", status: "pendiente" },
  { id: 2, plan_id: 1, date: "2025-09-21", status: "completado" }
];

// GET headers demo
router.get("/headers", (req, res) => {
  const auth = req.get("Authorization") || "sin token";
  res.json({ "Authorization recibido": auth });
});

// POST schedule con req.body
router.post("/", (req, res) => {
  const { plan_id, date, status } = req.body;

  if (!plan_id || !date || !status) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newSchedule = {
    id: schedules.length + 1,
    plan_id: parseInt(plan_id),
    date,
    status
  };

  schedules.push(newSchedule);

  res.status(201).json(newSchedule);
});

module.exports = router;
