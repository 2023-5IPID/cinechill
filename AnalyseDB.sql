CREATE DATABASE cinechill;
USE cinechill;

CREATE TABLE salles (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    numero_ou_nom VARCHAR(255) NOT NULL,
    nombre_de_places_total INT NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE films (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    realisateur VARCHAR(255),
    duree_min INT,
    genre VARCHAR(255),
    annee_sortie INT
);

CREATE TABLE clients (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    mail VARCHAR(255),
    age INT
);

CREATE TABLE seances (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    salle_id INT,
    film_id INT,
    date_heure DATETIME,
    FOREIGN KEY (salle_id) REFERENCES salles(Id),
    FOREIGN KEY (film_id) REFERENCES films(Id)
);

CREATE TABLE places (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT,
    seance_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(Id),
    FOREIGN KEY (seance_id) REFERENCES seances(Id)
);
