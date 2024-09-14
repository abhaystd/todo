

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  marked: {
    type: Boolean,
    default: false,  // New field to mark notes
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
