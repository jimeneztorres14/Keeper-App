import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { sql } from "./App";

function Note(props) {
  console.log(props)
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{
        sql('DELETE FROM notes WHERE id =($1)', [props.id]).then(()=>{
          props.onDelete(props.id)
          console.log(props)
        })
        // console.log(props.id)
        // console.log(notesDb)
        }} ><DeleteIcon /></button>
    </div>
  );
}

export default Note;

