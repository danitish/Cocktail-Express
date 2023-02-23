const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const {
  createEvent,
  myEvents,
  getEventById,
  deleteEvent,
} = require("../controllers/event");

router.route("/").post(auth, createEvent).get(auth, myEvents);
router.route("/:id").get(auth, getEventById).delete(auth, deleteEvent);

module.exports = router;
