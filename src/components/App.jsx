import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { neon } from '@neondatabase/serverless';

// const sql = neon('postgresql://neondb_owner:wsDf8yzTN3eQ@ep-polished-mud-a51amk9n.us-east-2.aws.neon.tech/neondb?sslmode=require');
// const notesDb = await sql('SELECT * FROM notes');
// console.log(notesDb[0])


function App() {
  const [noteList, setNoteList] = useState([])
  function addNote(noteList) {
    setNoteList((prevNotes) => {
      return [...prevNotes, noteList];
    });
  }

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
      onAdd={addNote}
      />
      {noteList.map((note, index)=>{
      return <Note key={index} id={index} title={note.noteTitle} content={note.noteContent} onDelete={deleteNote}/>
      })}
      <Footer />
    </div>
  );
}

export default App;


