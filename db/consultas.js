const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'futscript',
    allowExitOnIdle: true
})

const getTeams = async () => {
     const grupoEquipos = await pool.query("SELECT * FROM equipos");
     const equipos = grupoEquipos.rows;
     return equipos;
    }
    
    const getPlayers = async (teamID) => {
        const jugadores = await pool.query("SELECT * FROM jugadores WHERE id_equipo = $1", [teamID]);
        return jugadores.rows;
        
}

const addTeam = async (equipo) => {
    const { name } = equipo;
    const value = [name];
    const consulta ="INSERT INTO equipos VALUES (DEFAULT, $1);";
    await pool.query(consulta, value);
}

const addPlayer = async ({ jugador, teamID }) => {
    const { name, position } = jugador;
    const values = [ teamID, name, position]
    await pool.query("INSERT INTO jugadores VALUES (DEFAULT, $1, $2, $3);", values);
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer }