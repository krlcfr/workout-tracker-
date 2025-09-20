const express = require("express");
const router = express.Router();

// Simulación de datos
const plans = [
  { id: 1, user_id: 1, name: "Plan fuerza", status: "activo" },
  { id: 2, user_id: 1, name: "Plan cardio", status: "inactivo" },
  { id: 3, user_id: 2, name: "Plan mixto", status: "activo" }
];

// GET todos los planes con filtro opcional por user_id o status
router.get("/", (req, res) => {
  const { user_id, status } = req.query;
  let result = plans;

  if (user_id) {
    result = result.filter(p => p.user_id === parseInt(user_id));
  }

  if (status) {
    result = result.filter(p => p.status === status);
  }

  res.json(result);
});

// GET plan por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser numérico" });
  }

  const plan = plans.find(p => p.id === id);

  if (!plan) {
    return res.status(404).json({ error: "Plan no encontrado" });
  }

  res.json(plan);
});

module.exports = router;
