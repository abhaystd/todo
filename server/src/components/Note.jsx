import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";  // Icon for marking notes

function Note(props) {
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleMarkClick() {
    props.onMark(props.id);
  }

  return (
    <div className={`note ${props.marked ? "marked" : ""}`}>  {/* Add 'marked' class if marked */}
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleMarkClick}>
        <DoneIcon color={props.marked ? "primary" : "disabled"} />  {/* Icon color changes based on marked state */}
      </button>
      <button onClick={handleDeleteClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
