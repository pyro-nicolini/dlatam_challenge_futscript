CREATE DATABASE futscript;
\c futscript;

CREATE TABLE equipos (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE posiciones (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE jugadores (id SERIAL PRIMARY KEY, id_equipo INT REFERENCES equipos(id), name VARCHAR(250), position INT REFERENCES posiciones(id));

CREATE TABLE usuarios (id SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL);

INSERT INTO posiciones values
(DEFAULT, 'delantero'),
(DEFAULT, 'centrocampista'),
(DEFAULT, 'defensa'),
(DEFAULT, 'portero'); 