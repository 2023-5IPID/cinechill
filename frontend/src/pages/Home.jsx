import React, { useState, useEffect } from 'react';
import axios from '../axios';
import MovieDetails from '../components/MovieDetails';
import Filters from '../components/FiltersLayout';
import CarouselLayout from '../components/CarouselLayout';




function ErrorDisplay({ error, onClose }) {
    return (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
            <p>{error}</p>
        </div>
    );
}

function Home() {
    const [movies, setMovies] = useState([]);
    const [salles, setSalles] = useState([]);
    const [seances, setSeances] = useState([]);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/film').then((response) => {
          setMovies(response.data.film);
          setLoading(false);
        }).catch((error) => {
            console.error(error);
            setError('Une erreur est survenue lors du chargement des films.');
            setLoading(false);
        });
      }, []);

    const maxMovies = 12;
    const groupedMovies = [];
    for (let i = 0; i < movies.length && i < maxMovies; i += 3) {
        groupedMovies.push(movies.slice(i, i + 3));
    }
    console.log(groupedMovies);
  
      useEffect(() => {
        axios.get('/salle').then((response) => {
          setSalles(response.data.salles);
        }).catch((error) => {
            console.error(error);
            setError('Une erreur est survenue lors du chargement des salles.');
            setLoading(false);
        });
      }, []);
  
      useEffect(() => {
        axios.get('/seance').then((response) => {
          setSeances(response.data.seance);
        }).catch((error) => {
            console.error(error);
            setError('Une erreur est survenue lors du chargement des séances.');
            setLoading(false);
        });
      }, []);

    const handleMouseEnter = (movie) => {
        setHoveredMovie(movie);
    };

    const handleMouseLeave = () => {
        setHoveredMovie(null);
    };

    return (
        <div className="App">
            <CarouselLayout />
            <br /><br /><br />
            <header className="flex items-center justify-center">
                <h1 className="dark:text-white">Films à l'affiche</h1>
            </header>
            <div className="movie-list">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : groupedMovies.length === 0 ? (
                    <ErrorDisplay error={error} />
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
