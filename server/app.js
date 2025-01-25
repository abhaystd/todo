// server/app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Note = require("./models/noteModel");
require('dotenv').config()

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace <DB_CONNECTION_STRING> with your actual MongoDB URI)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// API routes

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new note
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  const newNote = new Note({
    title,
    content,
  });

  try {
    const savedNote = await newNote.save();
    console.log("vghbjnk");
    
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a note by ID
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(deletedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// server/app.js

// Toggle the "marked" status of a note
app.patch("/notes/:id/mark", async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.marked = !note.marked;  // Toggle the marked status
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
