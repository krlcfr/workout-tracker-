const express = require("express");
const router = express.Router();

const schedulesRoutes = require("./schedules.routes");

router.use("/schedules", schedulesRoutes);

module.exports = router;