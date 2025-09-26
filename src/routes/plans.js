const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");


const plans = [
  { id: 1, user_id: 1, name: "Plan fuerza", status: "activo" },
  { id: 2, user_id: 2, name: "Plan cardio", status: "pendiente" }
];

// GET listar todos
router.get("/", (req, res) => {
  return sendSuccess(res, plans);
});

// GET plan por ID
router.get("/:id", (req, res) => {
  const plan = plans.find(p => p.id === parseInt(req.params.id));
  if (!plan) return sendError(res, "Plan no encontrado", 404);
  return sendSuccess(res, plan);
});

// POST crear plan
router.post("/", (req, res) => {
  const { user_id, name, status } = req.body;

  if (!user_id || !name || !status) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  const newPlan = {
    id: plans.length + 1,
    user_id: parseInt(user_id),
    name,
    status
  };

  plans.push(newPlan);
  return sendSuccess(res, newPlan, 201);
});

// GET cabeceras demo
router.get("/headers-demo", (req, res) => {
  const client = req.get("User-Agent") || "no especificado";
  res.set("X-App-Version", "1.0.0");
  res.json({
    "User-Agent recibido": client
  });
});

module.exports = router;
