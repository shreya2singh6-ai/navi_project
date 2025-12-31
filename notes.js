const express = require("express");
const router = express.Router();
const Note = require("../models/Note");


// CREATE note
router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET all notes (pinned first)
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ pinned: -1, createdAt: -1 });
  res.json(notes);
});


// TOGGLE pin
router.patch("/:id/pin", async (req, res) => {
  const note = await Note.findById(req.params.id);
  note.pinned = !note.pinned;
  await note.save();
  res.json(note);
});


// DELETE note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
