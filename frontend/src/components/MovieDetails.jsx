import React, { useState, useEffect, useRef } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DarkModeLayout from '../components/DarkmodeLayout';
import axios from '../axios';


function isColorDark(color) {
    const [r, g, b] = hexToRgb(color);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}

function MovieDetails({ movie, onClose, imageWidth, imageHeight, seances }) {
    const [show, setShow] = useState(false);
    const [posterColor, setPosterColor] = useState('white');
    const [colorFetched, setColorFetched] = useState(false);
    const [reservation, setReservation] = useState({ user_id: '', seance_id: '', nb_places: ''});
    const { user, setUser, isDarkMode } = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const canvasRef = useRef(null);

    if (!user) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            if (img.width > 0 && img.height > 0) {
                const canvas = canvasRef.current;
                canvas.width = img.width;
                canvas.height = img.height;
                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, img.width, img.height);

                const imageData = context.getImageData(0, 0, img.width, img.height).data;

                let totalRed = 0;
                let totalGreen = 0;
                let totalBlue = 0;

                for (let i = 0; i < imageData.length; i += 4) {
                    totalRed += imageData[i];
                    totalGreen += imageData[i + 1];
                    totalBlue += imageData[i + 2];
                }

                const averageRed = Math.round(totalRed / (imageData.length / 4));
                const averageGreen = Math.round(totalGreen / (imageData.length / 4));
                const averageBlue = Math.round(totalBlue / (imageData.length / 4));

                const averageColor = `rgba(${averageRed}, ${averageGreen}, ${averageBlue})`;
                setPosterColor(averageColor);
                setColorFetched(true);
            } else {
                console.error('Erreur lors du chargement de l\'image');
            }
        };

        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    }, [movie.poster_path]);


    const textColor = isColorDark(posterColor) ? 'white' : 'black';

    const offcanvasStyle = {
        backgroundColor: posterColor,


    };

    const containerStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: imageWidth,
        height: imageHeight,
        //backgroundColor: posterColor,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '25px',
        zIndex: 1,
    };

    const gradientBackgroundStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3))',
        zIndex: 0,

    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '10px',
    };

    const reserveButtonStyle = {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        margin: '10px',
        cursor: 'pointer',
    };

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        axios.post('/reservation/add', reservation)
        .then((response) => {
            alert("La réservation a bien été effectuée");
        })
        .catch((error) => {
            console.error("Erreur lors de la réservation :", error);
        });
    };

    return (
        <>
            <div className="movie-details" style={containerStyle}>
                <h2 style={titleStyle}>{movie.titre}</h2>
                <p>{movie.resume}</p>
                <Button style={reserveButtonStyle} variant="primary" onClick={handleShow}>
                    Réserver
                </Button>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            <div style={gradientBackgroundStyle} className="dark:bg-gray-800"></div>

            <Offcanvas show={show} onHide={handleClose} style={offcanvasStyle}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ color: textColor }} >Réserve une séance pour: <br />{movie.titre}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {colorFetched && (
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.titre} className="img-fluid mb-3" />
                    )}
                    <p style={{ color: textColor }}>{movie.resume}</p>
                    <p style={{ color: textColor }}>Date de sortie : {movie.release_date}</p>

                    {/* Formulaire de réservation */}
                    <Form onSubmit={handleReservationSubmit}>
                        <Form.Group controlId="selectedDate">
                            <Form.Label>Sélectionnez une séance :</Form.Label>
                            <Form.Control as="select" onChange={(e) => setReservation({...reservation, seance_id: e.target.value})}>
                                <option value="">-- Choisissez une séance --</option>
                                {seances.map((seance) => (
                                    seance.film.id === movie.id ? (
                                        <option key={seance.id} value={seance.id}>{`${seance.horraire} - ${seance.salle.nom}`}</option>
                                    ) : null
                                ))}
                            </Form.Control>
                            <Form.Label>Nombre de places :</Form.Label>
                                <Form.Control
                                type="number"
                                onChange={(e) => setReservation({...reservation, nb_places: parseInt(e.target.value, 10)})}
                                min={1}
                                />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={() => setReservation({...reservation, user_id: user.id})} >
                            Réserver
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}

export default MovieDetails;
