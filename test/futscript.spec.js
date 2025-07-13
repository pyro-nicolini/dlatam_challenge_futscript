const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de Futscript", () => {
  it("1. Testeo de ruta GET/equipos. Debe retornar status 200", async () => {
    const response = await request(server).get("/equipos").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });
});
