import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [fullNote, setNote] = useState({
    noteTitle:"",
    noteContent:""
  });
  const [noteList, setNoteList] = useState([])


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

  function handleButton(event){
    event.preventDefault();
    setNoteList((prevNotes)=>{
      return [...prevNotes, fullNote]
    })
  };

  function deleteNote(id){
    setNoteList((prevNotes) =>{
      return prevNotes.filter((note, index)=>{
        return index != id;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea
      onInput={handleInput}
      onButton={handleButton}
      titleValue={fullNote.noteTitle}
      contentValue={fullNote.noteContent}
      />
      {noteList.map((note, index)=>{
      return <Note key={index} id={index} title={note.noteTitle} content={note.noteContent} onDelete={deleteNote}/>
      })}
      <Footer />
    </div>
  );
}

export default App;


