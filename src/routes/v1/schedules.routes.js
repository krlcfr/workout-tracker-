const express = require("express");
const router = express.Router();
const schedulesController = require("../../controllers/schedules.controller");

// CRUD horarios
router.get("/", schedulesController.getSchedules);
router.get("/:id", schedulesController.getScheduleById);
router.post("/", schedulesController.createSchedule);
router.put("/:id", schedulesController.updateSchedule);
router.patch("/:id", schedulesController.patchSchedule);
router.delete("/:id", schedulesController.deleteSchedule);

module.exports = router;
