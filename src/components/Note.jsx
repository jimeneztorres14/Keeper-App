import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { sql } from "./App";

function Note(props) {
  // console.log(props)
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={async ()=>{
        console.log(props.content)
        if(props.id === undefined){
          const notes = await sql("SELECT * FROM notes");
          const noteToDelete = notes[notes.length - 1]
          sql('DELETE FROM notes WHERE id =($1)', [noteToDelete.id]).then(()=>{
            props.onDelete(props.id)
          })
        }else{
          sql('DELETE FROM notes WHERE id =($1)', [props.id]).then(()=>{
            props.onDelete(props.id)
          })
        }
        }} ><DeleteIcon /></button>
    </div>
  );
}

export default Note;

