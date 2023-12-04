import React from 'react';
import { Link } from 'react-router-dom';

const style = {
  erreurContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  erreurContent: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  titreErreur: {
    color: '#dc3545',
  },
  retourLien: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  retourLienHover: {
    textDecoration: 'underline',
  },
};

const ErreurPage = ({ erreurMessage }) => {
  return (
    <div style={style.erreurContainer}>
      <div style={style.erreurContent}>
        <h1 style={style.titreErreur}>Error 404 : Page non trouvé ou non existante !</h1>
        <p>{erreurMessage}</p>
        <Link to="/" style={style.retourLien} className="retour-lien">
          Retour à la page d'accueil
        </Link>
      </div>
    </div>
  );
};

export default ErreurPage;
