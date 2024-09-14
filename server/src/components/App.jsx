
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch all notes from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Function to add a new note (handled only in CreateArea, so removed here)

  // Function to delete a note by its id
  function deleteNote(id) {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem._id !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  }

  // Function to mark/unmark a note
  function markNote(id) {
    fetch(`http://localhost:5000/notes/${id}/mark`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((updatedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((noteItem) =>
            noteItem._id === id ? { ...noteItem, marked: updatedNote.marked } : noteItem
          )
        );
      })
      .catch((error) => console.error("Error marking note:", error));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={(newNote) => setNotes((prevNotes) => [...prevNotes, newNote])} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          marked={noteItem.marked}
          onDelete={deleteNote}
          onMark={markNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;


