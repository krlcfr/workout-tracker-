// Archivo barril de rutas generales
const express = require("express");
const v1Routes = require("./v1");

const router = express.Router();

// Todas las rutas versión 1 van aquí
router.use("/v1", v1Routes);

module.exports = router;
