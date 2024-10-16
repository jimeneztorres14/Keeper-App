import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { sql } from "./App";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullNote, setNote] = useState({
    noteTitle:"",
    noteContent:""
  });


  function handleInput(event){
    const inputValue = event.target.value;
    const inputName = event.target.name;

    setNote((prevValue)=>{
      if(inputName === "title"){
        return {
          noteTitle:inputValue,
          noteContent:prevValue.noteContent
        }
      }else if(inputName === "content"){
        return{
          noteTitle:prevValue.noteTitle,
          noteContent:inputValue
        }
      }
    })
  };

  async function submitNote(event) {
    await sql('INSERT INTO notes (note_title, note_content) VALUES ($1, $2)', [fullNote.noteTitle, fullNote.noteContent]);
    const notesDb = await sql('SELECT * FROM notes');
    console.log(notesDb)


    props.onAdd(fullNote);
    setNote({
      noteTitle: "",
      noteContent: ""
    });
    event.preventDefault();
  }

  function expand(){
    setIsExpanded(true)
  }
  return (
    <div>
      <form className="create-note">
        {isExpanded && <input onChange={handleInput} name="title" placeholder="Title" value={fullNote.noteTitle} />}
        <textarea onChange={handleInput} onClick={expand} name="content" placeholder="Take a note..." rows={isExpanded ? 3 :1} value={fullNote.noteContent}/>
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote} ><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

