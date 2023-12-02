import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from '../components/MovieDetails';
import Filters from '../components/FiltersLayout';


function Home() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchMovies = (filters = {}) => {
        const tmdbApiKey = '8688e58fef221ff4ad0d063811690638';
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=fr-FR`;

        if (filters.genre) {
            url += `&with_genres=${filters.genre}`;
        }
        if (filters.duration) {
            url += `&with_runtime.gte=${filters.duration.min}&with_runtime.lte=${filters.duration.max}`;
        }

        axios
            .get(url, { withCredentials: false })
            .then((response) => {
                setMovies(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleFilterChange = (filters) => {
        fetchMovies(filters);
    };
    const maxMovies = 12;
    const groupedMovies = [];
    for (let i = 0; i < movies.length && i < maxMovies; i += 3) {
        groupedMovies.push(movies.slice(i, i + 3));
    }

    const handleMouseEnter = (movie) => {
        setHoveredMovie(movie);
    };

    const handleMouseLeave = () => {
        setHoveredMovie(null);
    };

    return (
        <div className="App">
            <header className="flex items-center justify-center">
                <h1 className="dark:text-white">Films à l'affiche</h1>
            </header>
            <div className="flex items-center justify-center">
                <Filters handleFilterChange={handleFilterChange} /><br /></div>





            <div className="movie-list">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : groupedMovies.length === 0 ? (
                    <div className="movie">
                        <h2>Film non disponible</h2>
                        <p>Désolé, il n'y a aucun film à l'affiche pour le moment.</p>
                    </div>
                ) : (
                    groupedMovies.map((group, groupIndex) => (
                        <div key={groupIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {group.map((movie, position) => (
                                <div
                                    key={movie.id}
                                    style={{
                                        width: '30%',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',

                                    }}
                                    onMouseEnter={() => handleMouseEnter(movie)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{
                                            cursor: 'pointer',
                                            opacity: hoveredMovie && hoveredMovie.id !== movie.id ? 0.8 : 1,
                                            transition: 'opacity 0.4s ease-in-out',
                                        }}
                                    />

                                    {hoveredMovie && hoveredMovie.id === movie.id && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <MovieDetails
                                                movie={hoveredMovie}
                                                onClose={handleMouseLeave}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div >
    );
}

export default Home;
