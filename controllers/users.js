const { verificarCredenciales, createUser } = require("../db/consultas");
const { secretKey } = require("../utils");
const jwt = require("jsonwebtoken");

const crearUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    await createUser(usuario);
    const { username } = usuario;
    console.log(`usuario ${username} creado con exito`);
  } catch (err) {
    res.status(500).send(err.message || "Error del servidor");
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { username, password } = req.body;
    await verificarCredenciales(username, password);
    const token = jwt.sign({ username }, secretKey);
    res.send(token);
    console.log(`bienvenido ${username}`);
  } catch (err) {
    res.status(500).send(err.message || "Error del servidor");
  }
};

module.exports = { iniciarSesion, crearUsuario };
