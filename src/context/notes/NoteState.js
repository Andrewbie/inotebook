import { useState } from 'react'
import NoteContext from './noteContext'


const host = "http://localhost:5000"
const NoteState = (props)=>{

    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'content-type':'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYzQ5NDU0OWZiOGM1ODYxNWU4M2E5In0sImlhdCI6MTcwODkzNTUzM30.gytv6pwstdPAyI3usHboxRGUh0Wl6pQu56kqw7jeBEI',
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
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYzQ5NDU0OWZiOGM1ODYxNWU4M2E5In0sImlhdCI6MTcwODkzNTUzM30.gytv6pwstdPAyI3usHboxRGUh0Wl6pQu56kqw7jeBEI',
          },
          body:JSON.stringify({title,description,tags})
          
        })

        const json =  response.json()



        console.log("New note added")
        const note = {
          "_id": "65dc2f434afa68e9e1b8b3sda",
          "user": "65d1ea7b6b804b1e90a8b629",
          "title": title,
          "description": description,
          "tags": tags,
          "date": "1708928835278",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }

      // Delete a note
      const deleteNote = async(id)=>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYzQ5NDU0OWZiOGM1ODYxNWU4M2E5In0sImlhdCI6MTcwODkzNTUzM30.gytv6pwstdPAyI3usHboxRGUh0Wl6pQu56kqw7jeBEI',
          }
          
        })

        console.log("note deleted with id "+id)
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)

      }

      // Edit a note
      const editNote = async(id,title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'POST',
          headers:{
            'content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYzQ5NDU0OWZiOGM1ODYxNWU4M2E5In0sImlhdCI6MTcwODkzNTUzM30.gytv6pwstdPAyI3usHboxRGUh0Wl6pQu56kqw7jeBEI',
          },
          body:JSON.stringify({title,description,tag})
          
        })

        const json =  response.json()

        for (let index = 0; index < notes.length; index++) {
          const element = notes(index)
          if(element._id===id){
            element.title = title
            element.description = description
            element.tag = tag
          }
          
        }
      }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
  )
}

export default NoteState;