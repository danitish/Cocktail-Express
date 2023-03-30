const Note = require("../models/note");
const asyncHandler = require("express-async-handler");

const createNote = asyncHandler(async (req, res) => {
  const { event_id, text } = req.body;
  if (!event_id || !text) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const note = await Note.create({
    event_id,
    text,
    user_id: req.user._id,
  });

  if (!note) {
    res.status(500);
    throw new Error("Internal error");
  }
  res.status(200);
  res.send(note);
});

const getMyNotesByEventId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }

  const notes = await Note.find({ event_id: id }).select("-__v");
  if (!notes) {
    res.status(404);
    throw new Error("No notes found");
  }
  res.status(200);
  res.send(notes);
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const note = await Note.findById(id);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  await note.remove();
  res.status(200);
  res.send("Deleted successfully");
});

module.exports = { createNote, getMyNotesByEventId, deleteNote };
