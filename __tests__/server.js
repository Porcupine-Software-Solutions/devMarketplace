const request = require('supertest');
const server = 'http://localhost:3000';

describe("route tests", () => {
  describe("register", () => {
  it("succesfully registers user", () => {
    const newUser = {username: "blah", password: "blah"}
    request(server)
    .post("/register")
    .send(newUser)
    .expect("Content-type", /json/)
    .expect(200)
    
  })
})
})
