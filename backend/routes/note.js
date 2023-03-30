const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createNote,
  getMyNotesByEventId,
  deleteNote,
} = require("../controllers/note");

router.route("/").post(auth, createNote);
router.route("/:id").delete(auth, deleteNote).get(auth, getMyNotesByEventId);

module.exports = router;
