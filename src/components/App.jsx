import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import notes from "../notes";

console.log(notes);

function NotesHolder(data){
    return(
    <Note
    key={data.key}
    title={data.title}
    content={data.content}
    />)
};

function App(){
    return(
        <div>
            <Header />
            {notes.map(NotesHolder)}
            <Footer />
        </div>
    )
};

export default App;