// Archivo barril de rutas v1
const express = require("express");
const usersRoutes = require("./users.routes");

const router = express.Router();

// Agregamos el módulo de users
router.use("/users", usersRoutes);

// Aquí más adelante añadiremos otros módulos:
// router.use("/exercises", exercisesRoutes);
// router.use("/plans", plansRoutes);
// router.use("/schedules", schedulesRoutes);
// router.use("/reports", reportsRoutes);

module.exports = router;
