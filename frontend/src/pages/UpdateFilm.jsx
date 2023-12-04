import React, { useState, useEffect } from "react";
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFilm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clickToBackHandler = () => navigate("/film");

  const fetchFilm = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/film/" + id);
      const filmData = result.data.data; // Accédez à la propriété 'data' de la réponse
    setFilm({
      titre: filmData.titre,
      realisateur: filmData.realisateur,
      duree_min: filmData.duree_min,
      genre: filmData.genre,
      annee_sortie: filmData.annee_sortie,
    });

    } catch (err) {
      //console.log("Something went wrong");
      setError('Erreur lors du chargement des données.');
    }
  };

  const [film, setFilm] = useState({
    titre: "",
    realisateur: "",
    duree_min: 0,
    genre: "",
    annee_sortie: "",
  });


  useEffect(() => {
    fetchFilm();
  }, []);



  const changeFilmFieldHandler = (e) => {
    setFilm({
      ...film,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    // Créer un nouvel objet qui contient uniquement les champs mis à jour.
    const updatedFilm = {
      titre: film.titre,
      realisateur: film.realisateur,
      duree_min: film.dureeMin,
      genre: film.genre,
      annee_sortie: film.anneeSortie,
    };

    try {
      // Envoyer l'objet film mis à jour au serveur.
      await axios.put("http://127.0.0.1:8000/api/film/" + id, updatedFilm);

      // Naviguer vers la page d'accueil.
      alert("les modification on été faite")
      navigate("/film");
    } catch (err) {
      //console.log(updatedFilm)
      setError('Erreur lors de la modification des données.');
    }
  };

  console.log(film)
  return (
    <div className="text-center">
        <div>
        <strong>Informations du film:</strong>
        <div>Titre: {film.titre}</div>
        <div>Réalisateur: {film.realisateur}</div>
        <div>Durée: {film.duree_min} minutes</div>
        <div>Genre: {film.genre}</div>
        <div>Année de sortie: {film.annee_sortie}</div>
      </div> 
      <br />
      <br />
      <strong>Edit Film</strong>
      <form>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Titre</label>
          </div>
          <div className="col">
            <input
              type="text"
              className="text-black form-control"
              placeholder={film.titre}
              name="titre"
              value={film.titre}
              onChange={(e) => changeFilmFieldHandler(e)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Réalisateur</label>
          </div>
          <div className="col">
            <input
              type="text"
              className="text-black form-control"
              placeholder="Réalisateur"
              name="realisateur"
              value={film.realisateur}
              onChange={(e) => changeFilmFieldHandler(e)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Durée (en minutes)</label>
          </div>
          <div className="col">
            <input
              type="number"
              className="text-black form-control"
              placeholder="Enter durée film(en minutes)"
              name="dureeMin"
              value={film.dureeMin}
              onChange={(e) => changeFilmFieldHandler(e)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Genre</label>
          </div>
          <div className="col">
            <input
              type="text"
              className="text-black form-control"
              placeholder="genre"
              name="genre"
              value={film.genre}
              onChange={(e) => changeFilmFieldHandler(e)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Année de sortie</label>
          </div>
          <div className="col">
            <input
              type="date"
              className="text-black form-control"
              placeholder="Enter film release year"
              name="anneeSortie"
              value={film.anneeSortie}
              onChange={(e) => changeFilmFieldHandler(e)}
            />
          </div>
        </div>

        <button type="submit"
          className="text-center"
          onClick={(e) => onSubmitChange(e)}>
          Update
        </button>
      </form>

      <div>
        <button className=" text-center "
          onClick={clickToBackHandler}>Retour</button>
      </div>
    </div>

  );
};

export default UpdateFilm;
