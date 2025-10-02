const express = require("express");
const router = express.Router();


const schedulesRoutes = require("./schedules.routes");
const plansRoutes = require("./plans.routes");


router.use("/schedules", schedulesRoutes);
router.use("/plans", plansRoutes);


module.exports = router;