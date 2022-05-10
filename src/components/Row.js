import {useState, useEffect} from 'react';
import axios from '../axios'
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer'

import "./Row.css"



const Row = ({title, fetchUrl, isLargeRow}) => {

    const base_url = 'https://image.tmdb.org/t/p/original'

    const [movies,setMovies] = useState([])
    const [trailerUrl,setTrailer] = useState('')

    useEffect(()=>{
        const callRequests = async() => {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results)
            return request;
        }
        callRequests();
    },[fetchUrl])

    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            autoplay:1,
        },
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailer("");
        }else {
            movieTrailer(movie.name,{tmdbId: movie.id})
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailer(urlParams.get("v"))
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }


    return (
        <div className="row">

            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => {
                    return (
                        <img onClick={() => handleClick(movie)} className={isLargeRow?"row__poster row__posterLarge":"row__poster"} src={isLargeRow ? base_url+movie.poster_path : base_url+movie.backdrop_path} alt={movie.name} key={movie.id} />
                    )
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;