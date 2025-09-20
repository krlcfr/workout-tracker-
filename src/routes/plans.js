const express = require("express");
const router = express.Router();

// Simulación de datos
const plans = [
  { id: 1, user_id: 1, name: "Plan fuerza", status: "activo" },
  { id: 2, user_id: 2, name: "Plan cardio", status: "pendiente" }
];

// GET headers demo
router.get("/headers", (req, res) => {
  const contentType = req.get("Content-Type") || "no especificado";
  res.json({ "Content-Type recibido": contentType });
});

// POST plan con req.body
router.post("/", (req, res) => {
  const { user_id, name, status } = req.body;

  if (!user_id || !name || !status) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newPlan = {
    id: plans.length + 1,
    user_id: parseInt(user_id),
    name,
    status
  };

  plans.push(newPlan);

  res.status(201).json(newPlan);
});

module.exports = router;
