import "./landing.css";
import { useState, useEffect, useContext } from "react";
import { Movie } from "./Movie";
import { MoviesContext } from "../movies-context";
import React from 'react';



export default function Landing() {
  const [initialMovies, setInitialMovies] = useState([]);
  // const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState();
  const [error, setError] = useState(null);
  const { movies, setMovies } = useContext(MoviesContext);

  function bookmark(movie, bookmarked) {
    movie.bookmarked = !bookmarked;
    setMovies(structuredClone(movies));
  }

  useEffect(() => {
    setError(null);
    fetch("http://localhost:3001/movies")
      .then((response) => response.json())
      .then((fetchedMovies) => {
        setMovies(fetchedMovies);
        setInitialMovies(fetchedMovies);
      })
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredList = initialMovies.filter((movie) => {
        return movie.title.toLowerCase().trim().includes(searchTerm);
      });

      setMovies(filteredList);
    } else {
      setMovies(initialMovies);
    }
  }, [searchTerm]);

  if (error) {
    return (
      <section>
        There has been a problem loading our movies. Please try again later.
      </section>
    )
  }

  return (
    <main className="main">

      <header>
        <h3>Recommended for you</h3>
      </header>

      <section className="ph">
        <input
          placeholder="Search for a movie"
          onKeyUp={(event) =>
            setSearchTerm(event.target.value.toLowerCase().trim())
          }
        ></input>
      </section>

      <section className="movie-container">
        <a href=''></a>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} bookmark={bookmark}></Movie>
        ))}
      </section>
    </main>
  );
}

// json-server --watch db.json --port 3001
// json-server db.json -m ./node_modules/json-server-auth --port 3001