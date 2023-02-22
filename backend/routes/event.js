const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const { createEvent, myEvents, getEventById } = require("../controllers/event");

router.route("/").post(auth, createEvent).get(auth, myEvents);
router.route("/:id").get(auth, getEventById);

module.exports = router;
