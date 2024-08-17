import {useState, useEffect  } from 'react';

import MovieCard from './MovieCard';
//c08ea0fa
import './App.css';
import SearchIcon from './search.svg'

const API_URL = 'https://www.omdbapi.com?apikey=c08ea0fa';

const movie1 = {
    "Title": "Interstellar",
    "Year": "2014",
    "imdbID": "tt0816692",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        console.log(data)
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Interstellar');
    }, []);
    return(
        <div className="app">
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

            {
                movies?.length > 0 
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}

                        <MovieCard movie={movie1}/>   
                        </div>
                    ) : (
                        <div className="empty">
                            <h2> No Movies found</h2>
                        </div>
                    )

                }
{
    movies.length > 0 && 
    <div className="container">
       <MovieCard movie={movies[0]}/>   
    </div>
}
        </div>
    );
}

export default App;