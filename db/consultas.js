const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "futscript",
  allowExitOnIdle: true,
});

const getTeams = async () => {
  const grupoEquipos = await pool.query("SELECT id, name FROM equipos");
  const equipos = grupoEquipos.rows;
  if (!equipos) {
    throw { code: 404, mensaje: "sin Datos para mostrar" };
  }
  return equipos;
};

const createUser = async (usuario) => {
  let { username, password } = usuario;
  if (!username || !password) {
    throw { code: 400, mensaje: "Nombre y/o contraseña no definido" };
  }
  const passwordEncriptada = await bcrypt.hashSync(password);
  password = passwordEncriptada;
  const values = [username, passwordEncriptada];
  const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2);";
  await pool.query(query, values);
  console.log("inscrito en la BD");
};

const verificarCredenciales = async (username, password) => {
  const values = [username];
  const query = "SELECT * FROM usuarios WHERE username = $1;";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(query, values);
  if (!usuario || !rowCount) {
    throw { code: 404, mensaje: "Usuario o contraseña inválida" };
  } else {
    const passwordCorrecta = await bcrypt.compareSync(
      password,
      usuario.password
    );
    if (!passwordCorrecta) {
      throw { code: 400, mensaje: "Usuario o contraseña inválida" };
    }
  }
};

const getPlayers = async (teamID) => {
  const result = await pool.query(
    `SELECT j.name AS name, p.name AS posicion
     FROM jugadores j
     INNER JOIN posiciones p ON j.position = p.id
     INNER JOIN equipos e ON e.id = j.id_equipo
     WHERE e.id = $1;`,
    [teamID]
  );
  const { rows, rowCount } = result;
  if (!rows || rowCount === 0) {
    throw { code: 400, mensaje: "Id no encontrado o Equipo inexistente" };
  }
  return rows;
};

const addTeam = async (equipo) => {
  const { name } = equipo;
  const value = [name];
  const consulta = "INSERT INTO equipos VALUES (DEFAULT, $1);";
  await pool.query(consulta, value);
};

const addPlayer = async ({ jugador, teamID }) => {
  const { name, position } = jugador;
  const values = [teamID, name, position];
  await pool.query(
    "INSERT INTO jugadores VALUES (DEFAULT, $1, $2, $3);",
    values
  );
};

module.exports = {
  getTeams,
  addTeam,
  getPlayers,
  addPlayer,
  verificarCredenciales,
  createUser,
};
