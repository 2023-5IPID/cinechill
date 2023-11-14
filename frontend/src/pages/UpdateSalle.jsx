import React, { useState, useEffect } from "react";
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateSalle = () => {
    const{id} = useParams();
    const navigate = useNavigate();
    const clickToBackHandler = () => navigate("/salle");

    const fetchSalle = async() => {
        try{
            const result = await axios.get("http://127.0.0.1:8000/api/salle/" + id);
            const salleData = result.data.data;
            setSalle({
                nom : salleData.nom,
                places : salleData.places,
                notes : salleData.notes,
            });
        }
        catch(err){
            console.log("ERROR : SOMETHING IS NOT RIGHT");
        }
    }

    const [salle, setSalle] = useState({
        nom: "",
        places: 0,
        notes: "",
      });

      useEffect(() => {
        fetchSalle();
      }, []);

      const changeSalleFieldHandler = (e) => {
        setSalle({
            ...salle,
        [e.target.name]:e.target.value,
        });
      };

      const onSubmitChange = async (e) => {
        e.preventDefault();
    
        const updatedSalle = {
          nom: salle.nom,
          places: salle.places,
          notes : salle.notes,
        };
    
        try {
          await axios.put("http://127.0.0.1:8000/api/Salle/" + id, updatedSalle);
          alert("les modification on été faite")
          navigate("/salle");
        } catch (err) {
          console.log(updatedSalle)
        }
      };

    console.log(salle);

    return (
        <div className="text-center">
            <div>
            <strong>Informations de la salle:</strong>
            <div>Nom: {salle.nom}</div>
            <div>Salles: {salle.places} places </div>
            <div>Durée: {salle.notes} </div>
          </div> 
          <br />
          <br />
          <strong>Modifier Salle</strong>
          <form>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Nom</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="text-black form-control"
                  placeholder={salle.nom}
                  name="nom"
                  value={salle.nom}
                  onChange={(e) => changeSalleFieldHandler(e)}
                />
              </div>
            </div>
    
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Places</label>
              </div>
              <div className="col">
                <input
                  type="number"
                  className="text-black form-control"
                  placeholder="places"
                  name="places"
                  value={salle.places}
                  onChange={(e) => changeSalleFieldHandler(e)}
                />
              </div>
            </div>
    
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Notes</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="text-black form-control"
                  placeholder="Notes"
                  name="notes"
                  value={salle.notes}
                  onChange={(e) => changeSalleFieldHandler(e)}
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
    
    export default UpdateSalle;