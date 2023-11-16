import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

//--------------------------------------------------------//


const Salle = () => {
    const[salles, setSalles] = useState([]);
    const[loading, setLoading] = useState(true);
    const[nom, setNom] = useState('');
    const[places, setPlaces] = useState('');
    const[notes, setNotes] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const url = "http://127.0.0.1:8000/api/salle";

// AXIOS
    axios
      .get(url)
      .then((response) => {
        setSalles(response.data.salles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

// HANDLE SUBMIT
const handleSubmit = async (event) => {
    event.preventDefault();
  
    // SALLE
    const salle = {
      nom,
      places,
      notes,
    };
  
    // TRY CATCH RECHARGEMENT
    try {
      // Add a new salle
      await axios.post('http://127.0.0.1:8000/api/salle/add', salle);
  
      // Fetch the updated list of salles after adding a new one
      const updatedSalles = await axios.get("http://127.0.0.1:8000/api/salle");
      setSalles(updatedSalles.data.salles);
  
      // Clear the form fields
      setNom('');
      setPlaces('');
      setNotes('');
    } catch (error) {
      console.error(error);
    }
  };
  

    const handleDeleteSalle = async (salleId) => {

        // TRY CATCH DELETE
        try {
            await axios.delete(`http://127.0.0.1:8000/api/salle/${salleId}`);
            const updatedSalles = await axios.get('http://127.0.0.1:8000/api/salle');
            setSalles((prevSalles) => prevSalles.filter(salle => salle.id !== salleId));
          } catch (error) {
            console.error(error);
        }
    }

    // AFFICHAGE SUR LA PAGE
    return(
        <section>
            <header>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom : 
                    </label>
                    <input type ="text" value={nom} onChange={(event) => setNom(event.target.value)}/>
                    <label>
                        Places : 
                    </label>
                    <input type ="number" value={places} onChange={(event) => setPlaces(event.target.value)}/>
                    <label>
                        Notes : 
                    </label>
                    <input type ="text" value={notes} onChange={(event) => setNotes(event.target.value)}/>
                    <br></br>
                    <br></br>
                    <button type = "submit">Créer une salle</button> 
                </form>
            </header>
            <main>
    {loading ? (
        <p>Loading...</p>
    ) : (
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Places</th>
                    <th>Notes</th>
                    <th>Suppression</th>
                    <th>Modifier</th>
                </tr>
            </thead>
            <tbody>
                {salles && salles.length > 0 ? (
                    salles.map((salle) => (
                        <tr key={salle.id}>
                            <td>{salle.nom}</td>
                            <td>{salle.places}</td>
                            <td>{salle.notes}</td>
                            <td>
                                <button onClick={() => handleDeleteSalle(salle.id)}>
                                    Supprimer
                                </button>
                            </td>
                            <td>
                            <button onClick={() => navigate(`/updateSalle/${salle.id}`)}>Modifier </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Aucune salle disponible.</td>
                    </tr>
                )}
            </tbody>
        </table>
    )}
</main>
        </section>
    )

}

export default Salle;