import React from 'react';

function MovieDetails({ movie, onClose, imageWidth, imageHeight }) {
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
        height: '100%', // Ajustez la hauteur pour que le dégradé commence plus haut
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

    return (
        <>
            <div className="movie-details" style={containerStyle}>
                <h2 style={titleStyle}>{movie.title}</h2>
                <p>{movie.overview}</p>
                <button style={reserveButtonStyle}>Réserver</button>
            </div>

            <div style={gradientBackgroundStyle}></div>
        </>
    );
}

export default MovieDetails;
