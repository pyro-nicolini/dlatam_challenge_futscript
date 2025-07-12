const express = require('express');
const app = express();

app.listen(3000, console.log("http://localhost:3000"));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos');
const { iniciarSesion, crearUsuario } = require('./controllers/users');


app.get("/equipos", obtenerEquipos)
app.post("/equipos", agregarEquipo)

app.post("/usuarios", crearUsuario)
app.post("/login", iniciarSesion)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", registrarJugador)
