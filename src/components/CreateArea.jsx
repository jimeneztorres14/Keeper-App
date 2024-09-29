import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form>
        <input onChange={props.onInput} name="title" placeholder="Title" value={props.titleValue} />
        <textarea onChange={props.onInput} name="content" placeholder="Take a note..." rows="3" value={props.contentValue}/>
        <button onClick={props.onButton} >Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

