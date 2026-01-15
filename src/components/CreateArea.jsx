import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea({ onAdd }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullNote, setFullNote] = useState({
    title: "",
    content: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setFullNote((prev) => ({ ...prev, [name]: value }));
  }

  function submitNote(event) {
    event.preventDefault();

    // Create payload BEFORE clearing state
    const payload = {
      title: fullNote.title,
      content: fullNote.content,
    };

    onAdd(payload);

    // Clear inputs
    setFullNote({ title: "", content: "" });
    setIsExpanded(false);
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            onChange={handleInput}
            name="title"
            placeholder="Title"
            value={fullNote.title}
          />
        )}

        <textarea
          onChange={handleInput}
          onClick={expand}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={fullNote.content}
        />

        <Zoom in={isExpanded}>
          <Fab type="submit" aria-label="Add note">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
