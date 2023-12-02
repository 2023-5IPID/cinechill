import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function AdminPage() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingSalle, setEditingSalle] = useState(null);

    const tmdbApiKey = '1ca4c292237ffb64b4f51e0967ef4932';
    let url = `https://api.themoviedb.org/3`;

      const handleNewFilm = async (movieId) => {
        try{
          const response = await fetch(`${url}/movie/${movieId}?language=fr-FR`, {
            withCredentials: false,
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2E0YzI5MjIzN2ZmYjY0YjRmNTFlMDk2N2VmNDkzMiIsInN1YiI6IjY1Njg4ZmY3NjgwYmU4MDBhZGI2NzY3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.btWLKNcwhM2Bvpj_IEdnRKHY9mroyrxvJCwmKjNHD_Q',
            },
          }); 
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          let newFilm = {
            "titre": data.title,
            "resume": data.overview,
            "duree_min": data.runtime,
            "genre": data.genres[0].name,
            "annee_sortie": data.release_date,
            "poster_path": data.poster_path,
          };
          addFilm(newFilm);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails du film:', error);
          throw error;
        }
      };
      

      const handleSearch = async () => {
        try {
          const response = await axios.get(
            `${url}/search/movie?language=fr-FR&query=${query}`,
            { withCredentials: false,
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2E0YzI5MjIzN2ZmYjY0YjRmNTFlMDk2N2VmNDkzMiIsInN1YiI6IjY1Njg4ZmY3NjgwYmU4MDBhZGI2NzY3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.btWLKNcwhM2Bvpj_IEdnRKHY9mroyrxvJCwmKjNHD_Q'
              }}
          );

          setLoading(false);

        if (response.data.results.length == 0){
          setError("aucun films trouvés")
        } else {
          setMovies(response.data.results);
        }
        } catch (error) {
          console.error('Error fetching movies:', error);
          setLoading(false);
          setError('erreur lors du chargement ou aucun film trouvé');
        }
      };

      function ErrorDisplay({ error, onClose }) {
        return (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                <p>{error}</p>
            </div>
        );
      }

      const handleEditClick = (data) => {
        setEditingSalle(data);
      };

    //const [user, setUser] = useState([]);
    //const [newUser, setNewUser] = useState({ name: '', email: '' });
  
    const [films, setFilms] = useState([]);
  
    const [salles, setSalles] = useState([]);
    const [newSalle, setNewSalle] = useState({ id: '', nom: '', places: '', notes: '' });
  
    const [seances, setSeances] = useState([]);
    const [newSeance, setNewSeance] = useState({ film_id: '', salle_id: '', horraire: '' });
  
    useEffect(() => {
      axios.get('/film').then((response) => {
        setFilms(response.data.film);
      });
    }, []);

    useEffect(() => {
      axios.get('/salle').then((response) => {
        setSalles(response.data.salles);
      });
    }, []);

    useEffect(() => {
      axios.get('/seance').then((response) => {
        setSeances(response.data.seance);
      });
    }, []);
  
    const addFilm = (data) => {
      axios.post('/film/add', data).then((response) => {
        alert("le film a bien été ajouté. La page va s'actualiser ");
        setFilms([...films, response.data.data]);
      });
    };
  
    const deleteFilm = (id) => {
      axios.delete(`/film/${id}`).then(() => {
        const updatedFilm = films.filter((film) => film.id !== id);
        setFilms(updatedFilm);
      });
    };

    const addSalle = () => {
      axios.post('/salle/add', newSalle).then((response) => {
        alert("la salle a bien été ajoutée. La page va s'actualiser ");
        setSalles([...salles, response.data[0]]);
      });
    };

    const updateSalle = () => {
      console.log(newSalle)
      axios.put(`/salle/${newSalle.id}`, newSalle).then(() => {
        const updatedSalle= salles.map((salle) => (salle.id === newSalle.id ? newSalle: salle));
        setSalles(updatedSalle);
        setEditingSalle(null);
      });
    };

    const deleteSalle = (id) => {
      axios.delete(`/salle/${id}`).then(() => {
        const updatedSalle= salles.filter((salle) => salle.id !== id);
        setSalles(updatedSalle);
      });
    };

    return (
      <div>
      <Tabs
      defaultActiveKey="film"
      id="uncontrolled-tab-example"
      className="mb-3">
        <Tab eventKey="film" title="Film management">
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>résumé</th>
                    <th>Durée</th>
                    <th>Genre</th>
                    <th>Année de sortie</th>
                    <th>poster path</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {films.map((film) => (
                    <tr key={film.id}>
                      <td>{film.titre}</td>
                      <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.resume}</td>
                      <td>{film.duree_min}</td>
                      <td>{film.genre}</td>
                      <td>{film.annee_sortie}</td>
                      <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.poster_path}</td>
                      <td>
                        <button 
                          onClick={() => deleteFilm(film.id)} 
                          style={{ width: '100%', backgroundColor: '#d43b2a', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <input
                  type="text"
                  placeholder="Rechercher des films..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}
                style={{ width: '20%', backgroundColor: '#196ae3', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>
                  Rechercher
                </button>
                {loading ? (
                    <p>aucune recherche éffectuée</p>
                  ) : movies.length === 0 ? (
                      <ErrorDisplay error={error} />
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                      <tbody>
                        {movies.map((movie) => (
                          <tr key={movie.id} style={{ border: '2px solid #ccc' }}>
                            <td style={{ border: '2px solid #ccc' }}>titre : {movie.title}</td>
                            <td style={{ border: '2px solid #ccc' }}>sortie : {movie.release_date}</td>
                            <button onClick={() => handleNewFilm(movie.id)} style={{ width: '100%', backgroundColor: '#1bb80d', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer' }}>
                              Ajouter
                            </button>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
        </Tab>
        <Tab eventKey="salle" title="Salle management">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>nom</th>
                <th>places</th>
                <th>notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {salles.map((salle) => (
                <tr key={salle.id}>
                  <td>
                    {editingSalle === salle ? (
                      <input
                        type="text"
                        placeholder={salle.nom}
                        onChange={(e) => setNewSalle({ ...newSalle, nom: e.target.value })}
                      />
                    ) : (
                      salle.nom
                    )}
                  </td>
                  <td>
                    {editingSalle === salle ? (
                      <input
                        type="number"
                        placeholder={salle.places}
                        onChange={(e) => setNewSalle({ ...newSalle, places: e.target.value })}
                      />
                    ) : (
                      salle.places
                    )}
                  </td>
                  <td>
                    {editingSalle === salle ? (
                      <input
                        type="text"
                        placeholder={salle.notes}
                        onChange={(e) => setNewSalle({ ...newSalle, notes: e.target.value, id: salle.id })}
                      />
                    ) : (
                      salle.notes
                    )}
                  </td>
                  <td>
                    {editingSalle === salle ? (
                      <>
                      <button
                        onClick={updateSalle}
                        style={{ width: '100%', backgroundColor: '#1bb80d', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer',}}>
                        Update
                      </button>
                      <button
                        onClick={() => handleEditClick(null)} // Cancel editing
                        style={{ width: '100%', backgroundColor: '#d43b2a', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer',}}>
                        Cancel
                      </button>
                      </>
                    ) : (
                      <><button
                          onClick={() => handleEditClick(salle)}
                          style={{ width: '100%', backgroundColor: '#2e6da4', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer',}}>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSalle(salle.id)}
                          style={{ width: '100%', backgroundColor: '#d43b2a', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer',}}>
                            delete
                          </button></>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="nom"
                    onChange={(e) => setNewSalle({ ...newSalle, nom: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="places"
                    onChange={(e) => setNewSalle({ ...newSalle, places: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="notes"
                    onChange={(e) => setNewSalle({ ...newSalle, notes: e.target.value })}
                  />
                </td>
                <td>
                  <button 
                  onClick={addSalle}
                  style={{ width: '100%', backgroundColor: '#1bb80d', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Add Salle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="seance" title="Seance management">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>film</th>
                <th>salle</th>
                <th>horaire</th>
              </tr>
            </thead>
            <tbody>
              {seances.map((seance) => (
                <tr key={seance.id}>
                  <td>{seance.film.titre}</td>
                  <td>{seance.salle.nom}</td>
                  <td>{seance.horraire}</td>
                  <td>
                    <button
                      //onClick={updateSalle}
                      style={{ width: '100%', backgroundColor: '#1bb80d', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer',}}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="User" title="User management">
        </Tab>
      </Tabs>
      </div>
    );
  };
  
  export default AdminPage;