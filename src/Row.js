import React, { useState, useEffect } from "react";
import axios from "./axios"; // originally: import instance from './axios
import "./Row.css";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

const img_base_url = "https://image.tmdb.org/t/p/original/";
let movieUrl = "";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const baseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${baseUrl}${fetchUrl}`);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    reset: true,
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Error", error));
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${img_base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            onClick={() => handleClick(movie)}
            alt={movie.name}
          />
        ))}

        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
