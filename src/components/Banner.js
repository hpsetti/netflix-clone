import {useState,useEffect} from 'react'
import axios from '../axios'
import requests from '../requests'

import "./Banner.css"

const Banner = () => {

    const [movie,setMovie] = useState('')

    useEffect(()=> {
        const fetchData = async() => {
            const recievedData =  await axios.get(requests.fetchNetflixOriginals)
            // console.log(recievedData.data.results[0])
            setMovie(recievedData.data.results[Math.floor(Math.random()*recievedData.data.results.length - 1)])
            return recievedData
        }

        fetchData()
    },[requests.fetchNetflixOriginals])

console.log(movie)

const truncate = (str,n) => {
    return str?.length > n ? str.substr(0,n-1) + "..." : str;
}

    return(
       <div className="banner"
        style={{
            backgroundSize:'cover',
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition:'center center'
        }}
       >
           <div className="banner__contents">
               <h1 className="banner__title">
                   {movie?.name || movie?.title || movie?.original_name}
               </h1>
               <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
               </div>
               <h1 className="banner__description">
                   {truncate(movie?.overview)}
               </h1>
           </div>

           <div className="banner--fadeBottom"></div>
       </div>
    )
}

export default Banner;