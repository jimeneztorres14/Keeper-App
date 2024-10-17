import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { sql } from "./App";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullNote, setNote] = useState({
    id:"",
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
    const noteId = crypto.randomUUID()
    setNote((prevValue)=>{
      const newNote = {
        ...prevValue,
        id:noteId,
      }
      props.onAdd(newNote);
      return newNote;
    })


    setNote({
      id:"",
      noteTitle: "",
      noteContent: ""
    });


    await sql('INSERT INTO notes (id, note_title, note_content) VALUES ($1, $2, $3)', [noteId, fullNote.noteTitle, fullNote.noteContent]);
    const notesDb = await sql('SELECT * FROM notes');

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

