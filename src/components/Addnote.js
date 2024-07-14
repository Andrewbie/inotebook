import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
const Addnote = (props) => {

  const context = useContext(noteContext)
  const {addNote} = context

  const [note,setNote] = useState({title:"", description:"", tags:""})

  const handleClick = (e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tags)
    setNote({title:"", description:"", tags:""})
    props.showAlert("Added Successfully", "success");
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <>
        <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required/></div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input type="text" className="form-control" id="tags" name='tags' onChange={onChange} value={note.tags}/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Addnote