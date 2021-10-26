import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";


const GetComic = () => {
    const [comic, setComic] = useState("");
    const [transcript, setTranscript] = useState("");
    const [currentComicNum, setCurrentComicNum] = useState(0);
    const [mostRecent, setMostRecent] = useState(0);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [viewed, setViewed] = useState(0);
    const { id } = useParams();
    let history = useHistory();

    React.useEffect(() => {

        // Get the most recent comic strip data for the landing page
        if (id == null) {
            axios.get(`https://xkcd.com/info.0.json`)
                .then((res) => {
                    let newComic = res.data;
                    setComic(newComic);
                    setTranscript(newComic.transcript.replace("\n", <br />));
                    setMostRecent(newComic.num);
                    setCurrentComicNum(newComic.num);
                    setViewed(viewed + 1);
                });
        } else {
            // Check the most recent comic's number (for creating random number)
            axios.get(`https://xkcd.com/info.0.json`)
                .then((res) => {
                    let newComic = res.data;
                    setMostRecent(newComic.num);
                });
            // Get the specific number's comic strip data
            axios.get(`https://xkcd.com/${id}/info.0.json`)
                .then((res) => {
                    let newComic = res.data;
                    setComic(newComic);
                    setTranscript(newComic.transcript.replace("\n", <br />));
                    setCurrentComicNum(newComic.num);

                    // Enable 'Next Button' except in the most recent comic page
                    if (id !== mostRecent) {
                        setNextDisabled(false);
                    }
                    // Disable 'Prev Button' in the 1st comic page
                    if (id === 1) {
                        setNextDisabled(false);
                        setPrevDisabled(true);
                    }
                    setViewed(viewed + 1);
                })
                .catch((error) => {
                    history.push(`/NotFound`);
                    window.location.reload();
                    console.log(error);
                });
        }
    }, [])

    // Handle 'Prev' button
    const toPrev = (event) => {
        event.preventDefault();
        history.push(`/comic/${currentComicNum - 1}`);
        window.location.reload();
    }

    // Handle 'Next' button
    const toNext = (event) => {
        event.preventDefault();
        history.push(`/comic/${currentComicNum + 1}`);
        window.location.reload();
    }

    // Handle 'Go' button to move to the entered comic id
    const moveTo = (event) => {
        event.preventDefault();
        console.log("GO Button Clicked");
        history.push(`/comic/${currentComicNum}`);
        window.location.reload();
    }

    // Handle 'Random' button to move to a random comic id
    const toRandom = (event) => {
        event.preventDefault();
        console.log("Random Button Clicked");
        const min = 1;
        const max = mostRecent;
        // Create a random number between the first ~ most recent comic number
        const randomNumber = Math.floor(min + Math.random() * (max - min));
        setCurrentComicNum(randomNumber);
        history.push(`/comic/${randomNumber}`);
        window.location.reload();
    }

    return (<div>
        <div className="div">
            <table>
                <thead>
                    <tr>
                        <th className="Th-left"><b> Title: {comic.safe_title}</b></th>
                        <th className="Th-right">{comic.year}-{comic.month}-{comic.day}  | viewed {viewed} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="Td-center">
                            <img src={comic.img} alt={comic.alt}></img>
                        </td>
                        <td className="Td-left">
                            {(comic.transcript) === "" ?
                                (<p>(No Transcript)</p>) : (<p>{transcript}</p>)
                            }
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
        <form>
            <button disabled={prevDisabled} onClick={(event) => {
                toPrev(event);
            }}> &lt; Prev </button>
            <input type="number" className="Input" placeholder="No."
                value={currentComicNum} onChange={(e) => setCurrentComicNum(e.target.value)}></input>
            <button id="Button-go" type="submit" onClick={(event) => {
                moveTo(event);
            }}> GO </button>

            <button disabled={nextDisabled} onClick={(event) => {
                toNext(event);
            }}> Next &gt; </button>
        </form>
        <br />
        <button id="Button-random" onClick={(event) => {
            toRandom(event);
        }}> Show Me Random </button>

    </div>

    )
}

export default GetComic;