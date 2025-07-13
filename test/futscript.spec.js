const request = require("supertest");
const server = require("../index");
const { secretKey } = require("../utils");
const jwt = require("jsonwebtoken");

describe("Operaciones CRUD de Futscript", () => {
  it("1. GET/equipos - Se obtiene un Array y un status code 200 ", async () => {
    const response = await request(server).get("/equipos").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
  });
  it("2. POST /login - Al enviar las credenciales correctas se obtiene un Object", async () => {
    const user = { username: "admin", password: "1234" };
    const response = await request(server).post("/login").send(user);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
  });
  it("3. POST /login - Al enviar credenciales incorrectas se obtiene un status code 400", async () => {
    const user = { username: "adm2in", password: "12345" };
    const response = await request(server).post("/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("4. POST /equipos/:teamID/jugadores - Al enviar un nuevo jugador junto a un token válido se obtiene un status code 201", async () => {
    const id = 1;
    const loginResponse = await request(server).post("/login").send({
      username: "admin",
      password: "1234",
    });
    expect(loginResponse.ok).toBe(true);
    const token = loginResponse.body.token;
    const nuevoJugador = {
      name: "Juan",
      position: 1,
    };
    const response = await request(server)
      .post(`/equipos/${id}/jugadores`)
      .set("Authorization", `Bearer ${token}`)
      .send(nuevoJugador);
    expect(response.status).toBe(201);
  });
});
