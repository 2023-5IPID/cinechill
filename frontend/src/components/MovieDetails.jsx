import React, { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';

function MovieDetails({ movie, onClose, imageWidth, imageHeight }) {
    const [show, setShow] = useState(false);
    const [reservationDate, setReservationDate] = useState('');
    const [reservationHour, setReservationHour] = useState('');
    const [reservationRoom, setReservationRoom] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const containerStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: imageWidth,
        height: imageHeight,
        backgroundColor: 'transparent',
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
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
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
        // Gérez ici la soumission du formulaire (envoi au backend, etc.)
        console.log('Date:', reservationDate);
        console.log('Heure:', reservationHour);
        console.log('Salle:', reservationRoom);
    };

    return (
        <>
            <div className="movie-details" style={containerStyle}>
                <h2 style={titleStyle}>{movie.title}</h2>
                <p>{movie.overview}</p>

                <Button style={reserveButtonStyle} variant="primary" onClick={handleShow}>
                    Réserver
                </Button>
            </div>

            <div style={gradientBackgroundStyle} className="dark:bg-gray-800"></div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className="dark:bg-gray-800">
                    <Offcanvas.Title className="dark:text-white">Réserve une séance pour {movie.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="dark:bg-gray-800">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="img-fluid mb-3" />
                    <p className="dark:text-white mb-3">{movie.overview}</p>
                    <p className="dark:text-white mb-3">Date de sortie : {movie.release_date}</p>

                    {/* Formulaire de réservation */}
                    <Form onSubmit={handleReservationSubmit}>
                        <Form.Group controlId="reservationDate">
                            <Form.Label>Date :</Form.Label>
                            <Form.Control type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="reservationHour">
                            <Form.Label>Heure :</Form.Label>
                            <Form.Control type="time" value={reservationHour} onChange={(e) => setReservationHour(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="reservationRoom">
                            <Form.Label>Salle :</Form.Label>
                            <Form.Control type="text" value={reservationRoom} onChange={(e) => setReservationRoom(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Réserver
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MovieDetails;
