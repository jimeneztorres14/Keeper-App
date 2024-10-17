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
            return {id:note.id, noteTitle: note.note_title, noteContent: note.note_content };
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


  async function addNote(noteList) {
    setNoteList((prevNotes) => {
      return [...prevNotes, noteList];
    }) 
  }

  async function deleteNote(id){
    const notes = await sql("SELECT * FROM notes");
    setNoteList(() =>{
      return notes.map((note)=>{
        return {id:note.id, noteTitle: note.note_title, noteContent: note.note_content }
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
      {noteList.map((note, index)=>{
      return <Note key={index} id={note.id} title={note.noteTitle} content={note.noteContent} onDelete={deleteNote}/>
      })}
      <Footer />
    </div>
  );
}

export default App;


