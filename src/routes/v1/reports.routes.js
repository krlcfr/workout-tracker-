const express = require("express");
const router = express.Router();
const reportsController = require("../../controllers/reports.controller");

// CRUD reportes
router.get("/", reportsController.getReports);
router.get("/:id", reportsController.getReportById);
router.post("/", reportsController.createReport);
router.put("/:id", reportsController.updateReport);
router.patch("/:id", reportsController.patchReport);
router.delete("/:id", reportsController.deleteReport);

module.exports = router;
