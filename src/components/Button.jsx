import React from "react"

export default function Button({roll, tenzies}){
    return(
        <div>
        <button className="btn" onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
    )
}