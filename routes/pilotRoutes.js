const express = require("express");
const authenticationToken = require("../middleware");
const {
  getAllPilot,
  getPilotById,
  addPilot,
  editPilot,
  deletePilot,
} = require("../controllers/pilotController");
const router = express.Router();

router.get("/", authenticationToken, getAllPilot);

router.get("/:id", authenticationToken, getPilotById);

router.post("/", authenticationToken, addPilot);

router.put("/:id", authenticationToken, editPilot);

router.delete("/:id", authenticationToken, deletePilot);

module.exports = router;
