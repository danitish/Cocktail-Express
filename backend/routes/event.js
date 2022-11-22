const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const { createEvent, myEvents } = require("../controllers/event");

router.post("/newEvent", auth, createEvent);
router.get("/myEvents", auth, myEvents);

module.exports = router;
