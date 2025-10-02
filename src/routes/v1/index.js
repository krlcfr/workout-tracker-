const express = require("express");
const router = express.Router();


const reportsRoutes = require("./reports.routes");
const schedulesRoutes = require("./schedules.routes");
const plansRoutes = require("./plans.routes");


router.use("/reports", reportsRoutes);
router.use("/schedules", schedulesRoutes);
router.use("/plans", plansRoutes);

module.exports = router;