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
    res.status(500).send(err);
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { username, password } = req.body;
    await verificarCredenciales(username, password);
    const token = jwt.sign({ username }, secretKey);
    if (!token) return res.status(400).send(err);
    res.status(200).json({ token });
  } catch (err) {
    res.status(err.code).send(err);
  }
};

module.exports = { iniciarSesion, crearUsuario };
