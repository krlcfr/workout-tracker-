const express = require("express");
const router = express.Router();

// Simulación de datos
const reports = [
  { id: 1, user_id: 1, date: "2025-09-01", progress: "Buen avance" },
  { id: 2, user_id: 2, date: "2025-09-15", progress: "Inicio de plan" }
];

// GET headers demo
router.get("/headers", (req, res) => {
  const client = req.get("User-Agent") || "no especificado";
  res.json({ "User-Agent recibido": client });
});

// POST reporte con req.body
router.post("/", (req, res) => {
  const { user_id, date, progress } = req.body;

  if (!user_id || !date || !progress) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newReport = {
    id: reports.length + 1,
    user_id: parseInt(user_id),
    date,
    progress
  };

  reports.push(newReport);

  res.status(201).json(newReport);
});

module.exports = router;
