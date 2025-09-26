const express = require("express");
const router = express.Router();

const plans = [
  { id: 1, user_id: 1, name: "Plan fuerza", status: "activo" },
  { id: 2, user_id: 2, name: "Plan cardio", status: "pendiente" }
];

// GET todos los planes
router.get("/", (req, res) => {
  res.json(plans);
});

// GET headers demo
router.get("/headers-demo", (req, res) => {
  const client = req.get("User-Agent") || "no especificado";

  res.set("X-App-Version", "1.0.0");
  res.json({
    "User-Agent recibido": client,
    mensaje: "Cabeceras de planes configuradas"
  });
});

// GET plan por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const plan = plans.find(p => p.id === parseInt(id));

  if (!plan) {
    return res.status(404).json({ error: "Plan no encontrado" });
  }

  res.json(plan);
});

// POST plan
router.post("/", (req, res) => {
  const { user_id, name, status } = req.body;

  if (!user_id || !name || !status) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newPlan = { id: plans.length + 1, user_id: parseInt(user_id), name, status };
  plans.push(newPlan);

  res.status(201).json(newPlan);
});

module.exports = router;
