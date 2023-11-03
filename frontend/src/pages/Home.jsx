import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Remplacez 'YOUR_TMDB_API_KEY' par votre propre clé API TMDb.
        const tmdbApiKey = '8688e58fef221ff4ad0d063811690638';
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=fr-FR`;

        axios
            .get(url)
            .then((response) => {
                setMovies(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <header>
                <h1>Films à l'affiche</h1>
            </header>
            <div className="movie-list">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : movies.length === 0 ? (
                    <div className="movie">
                        <h2>Film non disponible</h2>
                        <p>Désolé, il n'y a aucun film à l'affiche pour le moment.</p>
                    </div>
                ) : (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <a href={`/film/${movie.id}`}>Voir les détails</a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
