import "./landing.css";
import { useState, useEffect, useContext } from "react";
import { Movie } from "./Movie";
import { MoviesContext } from "../movies-context";
import { useNavigate } from "react-router-dom";


export default function Landing() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [error, setError] = useState(null);
  const { movies, setMovies } = useContext(MoviesContext);
  const navigate = useNavigate();

  function bookmark(movie, bookmarked) {
    movie.bookmarked = !bookmarked;
    setMovies(movies.slice());
  }

  useEffect(() => {
    setError(null);
    fetch("http://localhost:3001/movies")
      .then((response) => {
        if (response.ok) {
         return response.json();
        }
        if(response.status === 401) {
          navigate('/login');
        }
        throw new Error(response);
      })
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
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} bookmark={bookmark}></Movie>
        ))}
      </section>
    </main>
  );
}

// json-server --watch db.json --port 3001
// json-server db.json -m ./node_modules/json-server-auth --port 3001