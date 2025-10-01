const express = require("express");
const router = express.Router();


const exercisesRoutes = require("./exercises.routes");

router.use("/exercises", exercisesRoutes);

module.exports = router;
