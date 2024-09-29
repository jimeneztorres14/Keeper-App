import React, {useState} from "react";

function CreateArea(props) {
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

  function submitNote(event) {
    props.onAdd(fullNote);
    setNote({
      noteTitle: "",
      noteContent: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input onChange={handleInput} name="title" placeholder="Title" value={fullNote.noteTitle} />
        <textarea onChange={handleInput} name="content" placeholder="Take a note..." rows="3" value={fullNote.noteContent}/>
        <button onClick={submitNote} >Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

