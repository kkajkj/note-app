import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import CreateNote from "./CreateNote"
import "./notes.css"
import Note from "./Note"
export default function Notes() {
    const [inputText, setInputText] = useState('')
    const [notes, setNotes] = useState([])
    const [editToggle, setEditToggle] = useState(null)

    const editHandler = (id, text) => {
        setEditToggle(id)
        setInputText(text)
    }
    const saveHandler = () => {
        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ? { ...note, text: inputText }
                    : note
            )))
        } else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText
                }
            ])
        }
        setInputText("")
        setEditToggle(null)
    }
    const deleteHandler = (id) => {
        const newNotes = notes.filter((note) => note.id !== id)
        setNotes(newNotes)
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'))
        if (data) {
            setNotes(data)
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes))
    }, [notes])
    return (
        <div className="notes">
            {
                notes.map((note) => (
                    note.id === editToggle ?
                        <CreateNote
                            key={note.id}
                            inputText={inputText}
                            setInputText={setInputText}
                            saveHandler={saveHandler}
                        />
                        :
                        <Note
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            editHandler={editHandler}
                            deleteHandler={deleteHandler}></Note>
                ))
            }
            {
                editToggle == null ?
                    <CreateNote
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={saveHandler}
                    /> : <></>
            }
        </div>
    )
}