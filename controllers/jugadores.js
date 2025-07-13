const { getPlayers, addPlayer } = require("../db/consultas");
const { secretKey } = require("../utils");
const jwt = require("jsonwebtoken");

const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params;
    if (!teamID) {
      return res.status(400).send("Falta el ID del equipo");
    }
    let jugadores = await getPlayers(teamID);
    res.json(jugadores);
  } catch (error) {
    res.status(500).send(error.message || "Error al obtener los jugadores");
  }
};

const registrarJugador = async (req, res) => {
  try {
    const { teamID } = req.params;
    const Authorization = req.header("Authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      res.status(401).send("Credenciales inválidas o incorrectas");
      return;
    }
    const token = Authorization.split("Bearer ")[1];
    try {
      jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(403).send("Token inválido o expirado");
    }
    const jugador = req.body;
    const { name, position } = jugador;
    if (!name || !position) {
      return res.status(400).send("Datos del jugador incompletos");
    }
    await addPlayer({ jugador, teamID });
    res.json({ message: "Jugador agregado con éxito" });
  } catch (err) {
    res.status(500).send(err.message || "Error del servidor");
  }
};

module.exports = { obtenerJugadores, registrarJugador };
