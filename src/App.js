import { useState, useEffect } from "react";

import MovieCard from "./components/MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
import Loader from "./components/Loader";

const API_URL = "https://www.omdbapi.com?apikey=c08ea0fa";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const searchMovies = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      console.log(data);
      setMovies(data.Search);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Interstellar");
  }, []);
  return (
    <div className="app">
      {loading ? (
        <div
          className="loader-container"
        >
            <Loader color={"#fff"} />
        </div>
      ) : (
        <>
          <h1>MovieLand</h1>

          <div className="search">
            <input
              placeholder="Search for movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={SearchIcon}
              alt="search"
              onClick={() => searchMovies(searchTerm)}
            />
          </div>

          {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2> No Movies found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
