const { verificarCredenciales, createUser } = require('../db/consultas')

const crearUsuario = async(req, res) => {
    const usuario = req.body;
    await createUser(usuario);
    const {name, rol} = usuario;
    console.log(`usuario ${name} rol ${rol} creado con exito`)
}

const iniciarSesion = async(req, res) => {
    const {name, password} = req.body;
    await verificarCredenciales(name, password);
    const token = jwt.sign({name}, secretKey);
    console.log(token)
    res.send(token);
}   

module.exports = {iniciarSesion, crearUsuario};