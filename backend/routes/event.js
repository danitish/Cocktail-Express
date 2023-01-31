const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const { createEvent, myEvents } = require("../controllers/event");

router.route("/").post(auth, createEvent).get(auth, myEvents);

module.exports = router;
