import React from "react";

export default function Note({ id, title, content, onDelete, onEdit }) {
  return (
    <div className="note">
      {title ? <h3>{title}</h3> : null}
      {content ? <p style={{ whiteSpace: "pre-wrap" }}>{content}</p> : null}

      <div className="note-actions">
        <button type="button" className="btn small" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="btn small danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}