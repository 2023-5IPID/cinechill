// import { useAuth } from '../contexts/AuthContext';
import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

// fetch('http://127.0.0.1:8000/api/film').then((response)=>{console.log(response.json())}) 

const Film = () => {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titre, setTitre] = useState('');
  const [realisateur, setRealisateur] = useState('');
  const [dureeMin, setDureeMin] = useState('');
  const [genre, setGenre] = useState('');
  const [anneeSortie, setAnneeSortie] = useState('');

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/film";

    axios
      .get(url)
      .then((response) => {
        setFilms(response.data.film);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const maxFilms = 12;
  const groupedFilms = [];
  for (let i = 0; i < films.length && i < maxFilms; i += 3) {
    groupedFilms.push(films.slice(i, i + 3));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const film = {
      titre,
      realisateur,
      duree_min: dureeMin,
      genre,
      annee_sortie: anneeSortie,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/film/add', film);
      console.log(response.data);
      // Rechargez la liste des films après l'ajout
      alert("le film a bien été ajouté. La page va s'actualiser ")
      const updatedFilms = await axios.get("http://127.0.0.1:8000/api/film");
      setFilms(updatedFilms.data.film);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFilm = async (filmId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/film/${filmId}`);

      // Reload the list of films after deleting
      alert("le film a bien été supprimé. La page va s'actualiser ")
      const updatedFilms = await axios.get('http://127.0.0.1:8000/api/film');
      setFilms(updatedFilms.data.film);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url('../src/assets/b-gauth.png')` }}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          className=" h-20 mr-1 mb-10"
          src="../src/assets/LogoRed.png"
          alt="logo"
        />
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8  bg-black border-black">
          <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
            <div className="movie-list">
              <header>
                <h1 className="text-x2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white" >Ajout de film</h1>
                <p>-----------------------------------------</p>
              </header>
              <form onSubmit={handleSubmit}>
                <label>
                  Titre:
                  <input
                    type="text"
                    value={titre}
                    onChange={(event) => setTitre(event.target.value)}
                    className="text-black"
                  />
                </label>
                <br />

                <label>
                  Réalisateur:
                  <input
                    type="text"
                    value={realisateur}
                    onChange={(event) => setRealisateur(event.target.value)}
                    className="text-black"
                  />
                </label>
                <br />

                <label>
                  Durée (en minutes):
                  <input
                    type="number"
                    value={dureeMin}
                    onChange={(event) => setDureeMin(event.target.value)}
                    className="text-black"
                  />
                </label>
                <br />

                <label>
                  Genre:
                  <input
                    type="text"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                    className="text-black"
                  />
                </label>
                <br />

                <label>
                  Date de sortie:
                  <input
                    type="date"
                    value={anneeSortie}
                    onChange={(event) => setAnneeSortie(event.target.value)}
                    className="text-black"
                  />
                </label>
                <br />

                <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  type="submit">Ajouter un film</button>
              </form>
              <header>
                <h1>Liste des films</h1>
                <p>-----------------------------------------</p>
              </header>
              {loading ? (
                <p>Chargement en cours...</p>
              ) : groupedFilms.length === 0 ? (
                <div className="movie">
                  <h2>Film non disponible</h2>


                  <p>Désolé, il n'y a aucun film disponible pour le moment.</p>
                </div>
              ) : (
                groupedFilms.map((group, index) => (
                  <div key={index} className="row">
                    {group.map((film) => (
                      <div key={film.id} className="movie">
                        <h2>{film.titre}</h2>
                        <p>Réalisateur : {film.realisateur}</p>
                        <p>Durée : {film.duree_min} minutes</p>
                        <p>Genre : {film.genre}</p>
                        <p>Année de sortie : {film.annee_sortie}</p>
                        <button
                          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                          onClick={() => handleDeleteFilm(film.id)}>Supprimer le film</button>
                        <button
                          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                          onClick={() => navigate(`/update/${film.id}`)}>
                          Edit
                        </button>
                        <p>---------------------------------------------------</p>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Film;
