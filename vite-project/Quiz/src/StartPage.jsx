import React from "react";
import './Startpage.css'

export default function StartPage(props) {
    return (
        <div>
            <h1 className="title">Quizzical</h1>
            <p className="text">This is a quiz game</p>
            <a href="#" className="start-btn" onClick={props.handleClick}>Start quiz</a>
        </div>
    )
}