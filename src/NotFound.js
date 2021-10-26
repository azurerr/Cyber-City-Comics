import React from 'react'
import { useHistory } from "react-router-dom";

function NotFound() {

    let history = useHistory();

    const goRandom = (event) => {
        event.preventDefault();
        console.log("Random Button Clicked");
        const min = 1;
        const max = 2000;
        const randomNumber = Math.floor(min + Math.random() * (max - min));
        history.push(`/comic/${randomNumber}`);
    }

    return (
        <div>
            <h1>Page Not Found</h1>
            <p>Maybe try a random comic?</p>
            <button id="Button-random" onClick={(event) => {
                goRandom(event);
            }}> Show Me Random </button>
        </div>
    )
}

export default NotFound;