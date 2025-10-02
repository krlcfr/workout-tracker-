const express = require("express");
const router = express.Router();
const plansController = require("../../controllers/plans.controller");

// CRUD planes
router.get("/", plansController.getPlans);
router.get("/:id", plansController.getPlanById);
router.post("/", plansController.createPlan);
router.put("/:id", plansController.updatePlan);
router.patch("/:id", plansController.patchPlan);
router.delete("/:id", plansController.deletePlan);

module.exports = router;
