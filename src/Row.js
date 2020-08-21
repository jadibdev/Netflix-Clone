import React, { useState, useEffect } from "react";
import axios from "./axios"; // originally: import instance from './axios
import "./Row.css";

const img_base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  /*  useEffect(() => {
        function fetchData() {
            const request = axios
              .get(`https://api.themoviedb.org/3${fetchUrl}`)
              .then(function (response) {
                // handle success
                console.log(response);
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
        }
        fetchData()
    }, [])  */
  const baseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${baseUrl}${fetchUrl}`);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}

        {movies.map((movie) => (
          <img
            className="row__poster"
            src={`${img_base_url}${movie.poster_path}`}
            alt={movie.name}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
