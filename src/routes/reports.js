const express = require("express");
const router = express.Router();

const reports = [
  { id: 1, user_id: 1, date: "2025-09-01", progress: "Buen avance" },
  { id: 2, user_id: 2, date: "2025-09-15", progress: "Inicio de plan" }
];

// GET todos los reports
router.get("/", (req, res) => {
  res.json(reports);
});

// GET headers demo
router.get("/headers-demo", (req, res) => {
  const token = req.get("Authorization") || "sin token";

  res.set("X-Security-Level", "high");
  res.json({
    "Authorization recibido": token,
    mensaje: "Cabeceras de reports configuradas"
  });
});

// GET report por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const report = reports.find(r => r.id === parseInt(id));

  if (!report) {
    return res.status(404).json({ error: "Reporte no encontrado" });
  }

  res.json(report);
});

// POST reporte
router.post("/", (req, res) => {
  const { user_id, date, progress } = req.body;

  if (!user_id || !date || !progress) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newReport = { id: reports.length + 1, user_id: parseInt(user_id), date, progress };
  reports.push(newReport);

  res.status(201).json(newReport);
});

module.exports = router;
