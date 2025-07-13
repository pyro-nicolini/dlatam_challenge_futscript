const { getPlayers, addPlayer } = require('../db/consultas')
const { secretKey } = require('../utils')
const jwt = require('jsonwebtoken')

const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params
    const jugadores = await getPlayers(teamID)
    res.json(jugadores)
}

const registrarJugador = async (req, res) => {
    const { teamID } = req.params
    const Authorization = req.header("Authorization")
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
        res.status(401).send('Credenciales inválidas o incorrectas');
    }
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, secretKey);
    console.log(payload)
    const jugador = req.body
    await addPlayer({ jugador, teamID })
    res.json({ message: "Jugador agregado con éxito" })
}


module.exports = { obtenerJugadores, registrarJugador }