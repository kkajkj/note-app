import React from "react"
export default function Note ({id, text, editHandler, deleteHandler}){
    return(
        <div className="note">
            <div className="note-body">{text}</div>
            <div className="note-footer" style={{justifyContent:"flex-end"}}>
             <button className="note-save" onClick={()=>deleteHandler(id)}>delete</button>
             <button className="note-save"onClick={()=>editHandler(id,text)}>edit</button>
            </div>
        </div>
    )
}