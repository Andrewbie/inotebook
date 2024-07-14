import { useState } from 'react'
import NoteContext from './noteContext'


const host = "http://localhost:5000"
const NoteState = (props)=>{

    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'content-type':'application/json',
          'auth-token':localStorage.getItem('token'),
        }
        
      })
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

    

      const [notes,setNotes] = useState([])

      // Add a new Note
      const addNote = async(title, description, tags)=>{
        //TODO API call
        const response = await fetch(`${host}/api/notes/addNote`,{
          method:'POST',
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token'),
          },
          body:JSON.stringify({title,description,tags})
          
        }) 

        const note =  await response.json()
        setNotes(notes.concat(note))
        
      }

      // Delete a note
      const deleteNote = async(id)=>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token'),
          }
          
        })

        console.log("note deleted with id "+id)
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
        const json =  await response.json()
        console.log(json)
      }

      // Edit a note
      const editNote = async(id,title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token'),
          },
          body:JSON.stringify({title,description,tag})
          
        })

        const json =  await response.json()
        console.log(json)

        const newNote = await JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index]
          if(element._id===id){
            element.title = title
            element.description = description
            element.tag = tag
            break;
          }
          
        }
        setNotes(newNote)
      }
    
    return (
        <NoteContext.Provider value={{notes,setNotes, addNote, deleteNote, editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
  )
}

export default NoteState;