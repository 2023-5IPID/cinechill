import React, { useState, useEffect } from "react";
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col } from "reactstrap";
import Film from "./Film";

const PresentationFilm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const clickToBackHandler = () => navigate("/film");
    const [posterPath, setPosterPath] = useState("");
    
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
  
    const fetchFilm = async () => {
      try {
        const result = await axios.get("http://127.0.0.1:8000/api/film/" + id);
        const filmData = result.data.data;
  
        setFilm({
          ...film,
          ...filmData,
        });
      } catch (err) {
        console.log("Something went wrong");
      }
    };
      useEffect(() => {
        if (film.titre) {
           fetchPoster(film);
         
        }
      }, [film]);
    const fetchPoster = async (film) => {

        const tmdbApiKey = '8688e58fef221ff4ad0d063811690638';
        const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${film.titre}`;
        try {
          const response = await axios.get(tmdbUrl);
          const results = response.data.results;
          
          
          if (results.length > 0) {
            const firstResult = results[0];
            setPosterPath(firstResult.poster_path);
          } else {
            setPosterPath(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          
        }
      };
    
    return (
      <div
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Card>
          <Row>
            <Col sm="12">
              <h1>{film.titre}</h1>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <p>Réalisateur : {film.realisateur}</p>
              <p>Durée : {film.duree_min} minutes</p>
              <p>Genre : {film.genre}</p>
              <p>Année de sortie : {film.annee_sortie}</p>
            </Col>
            <Col sm="6">
            <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Poster du film" />
            </Col>
          </Row>
        </Card>
        <div>
          <button className="text-center" onClick={clickToBackHandler}>
            Retour
          </button>
        </div>
      </div>
    );
  };
  
  export default PresentationFilm;