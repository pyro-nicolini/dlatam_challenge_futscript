const { verificarCredenciales, createUser } = require("../db/consultas");
const { secretKey } = require("../utils");
const jwt = require("jsonwebtoken");

const crearUsuario = async (req, res) => {
  const usuario = req.body;
  await createUser(usuario);
  const { username } = usuario;
  console.log(`usuario ${username} creado con exito`);
};

const iniciarSesion = async (req, res) => {
  const { username, password } = req.body;
  await verificarCredenciales(username, password);
  const token = jwt.sign({ username }, secretKey);
  res.send(token);
};

module.exports = { iniciarSesion, crearUsuario };
