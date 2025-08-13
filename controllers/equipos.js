const { getTeams, addTeam } = require("../db/consultas");

const obtenerEquipos = async (req, res) => {
  try {
    const equipos = await getTeams();
    if (!equipos) {
      res.send("Equipo no encontrado");
      return;
    }
    res.json(equipos);
  } catch (err) {
    res.status(500).send(err);
  }
};

const agregarEquipo = async (req, res) => {
  try {
    const equipo = req.body;
    if (!equipo || Object.keys(equipo).length === 0) {
      return res.status(400).send("Datos del equipo incompletos");
    }
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
    await addTeam(equipo);
    res.status(200).send({ message: "Equipo agregado con éxito" });
  } catch (err) {
    res.status(500).send(err.message || "Error del servidor");
  }
};

module.exports = { obtenerEquipos, agregarEquipo };