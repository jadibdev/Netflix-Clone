import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const img_base_url = "https://image.tmdb.org/t/p/original/";
const backdrop = "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const baseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `${baseUrl}${requests.fetchNetflixOriginals}`
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );

      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgoundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${img_base_url}${movie.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">{movie.name}</h1>
        <div>
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie.overview, 150)}</h1>

        <div className="banner__fadeBottom"></div>
      </div>
    </header>
  );
};

export default Banner;
