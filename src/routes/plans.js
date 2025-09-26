const express = require("express");
const router = express.Router();
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const plans = [
  { id: 1, user_id: 1, name: "Plan fuerza", status: "activo" },
  { id: 2, user_id: 2, name: "Plan cardio", status: "pendiente" }
];

// GET todos los planes
router.get("/", (req, res) => {
  try {
    return sendSuccess(res, plans, 200);
  } catch (err) {
    return sendError(res, 500, "Error al obtener planes", "INTERNAL_ERROR");
  }
});

// GET plan por ID
router.get("/:id", (req, res) => {
  try {
    const plan = plans.find(p => p.id === parseInt(req.params.id));
    if (!plan) return sendError(res, 404, "Plan no encontrado", "PLAN_NOT_FOUND");
    return sendSuccess(res, plan, 200);
  } catch (err) {
    return sendError(res, 500, "Error interno del servidor", "INTERNAL_ERROR");
  }
});

// POST plan
router.post("/", (req, res) => {
  try {
    const { user_id, name, status } = req.body;
    if (!user_id || !name || !status) return sendError(res, 400, "Faltan campos obligatorios", "VALIDATION_ERROR");

    const newPlan = { id: plans.length + 1, user_id: parseInt(user_id), name, status };
    plans.push(newPlan);

    return sendSuccess(res, newPlan, 201);
  } catch (err) {
    return sendError(res, 500, "Error al crear plan", "INTERNAL_ERROR");
  }
});

module.exports = router;
