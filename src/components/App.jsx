import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { neon } from '@neondatabase/serverless';

export const sql = neon('postgresql://neondb_owner:wsDf8yzTN3eQ@ep-polished-mud-a51amk9n.us-east-2.aws.neon.tech/neondb?sslmode=require');

function App() {
  const [noteList, setNoteList] = useState([])
  useEffect(()=>{
    function newFunction() {
      return sql('SELECT * FROM notes')
        .then((notesDb) => {
          const newArray = notesDb.map((note) => {
            return { id:note.id, noteTitle: note.note_title, noteContent: note.note_content };
          });
          return newArray;
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
    newFunction().then((response)=>{
      setNoteList(response)
    })
  }, [])


  function addNote(noteList) {
    setNoteList((prevNotes) => {
      return [...prevNotes, noteList];
    });
    
  }

  function deleteNote(id){
    setNoteList((prevNotes) =>{
      sql('DELETE FROM notes WHERE id =($1)', [id]).then()
      return prevNotes.filter((note, index)=>{
        return index != id;
      })
    })
  }

  console.log(noteList)

  return (
    <div>
      <Header />
      <CreateArea
      onAdd={addNote}
      />
      {noteList.map((note)=>{
      return <Note key={note.id} id={note.id} title={note.noteTitle} content={note.noteContent} onDelete={deleteNote}/>
      })}
      <Footer />
    </div>
  );
}

export default App;


