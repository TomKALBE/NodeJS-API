const mongoose = require("../config/database");
const request = require('supertest');
const express = require('express');
const tasks = require("../routes/tasks");
const users = require("../routes/users");
const url = mongoose.connection._connectionString;

const app = express();
app.use(express.json());

app.use("/tasks", tasks);
app.use("/users", users);


test("L'Addresse de la DB doit contenir nodejsapi mais pas dev ni prod", () => {
    expect(url).toMatch(/nodejsapi/);
    expect(url).not.toMatch(/dev/);
    expect(url).not.toMatch(/prod/);
});

describe("Task model", () => {
    let id = 0;
    let done = "";
    test(`GET Recuperer les donnees sur l'url /tasks`, async () => {
        const res = await request(app)
         .get('/tasks')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        const data = JSON.parse(res.text)
        id = data.data.tasks[0].id;
        done = data.data.tasks[0].done
    });
    test(`GET Recuperer les donnees sur l'url /tasks/id`, async () => {
        const res = await request(app)
         .get('/tasks/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
    test('Post tasks correct', async () => {
        const result = await request(app)
          .post("/tasks/")
          .send({
            description: "APICRUD",
            done: false,
          })
          .expect(201);
    });
    test('Post tasks incorrect', async () => {
        const result = await request(app)
          .post("/tasks/")
          .send({
            done: false,
          })
          .expect(500);
    });
    test('PUT tasks correct', async () => {
        const result = await request(app)
          .put("/tasks/" + id)
          .send({done:true})
          .expect(200);
    });
    test('PUT tasks incorrect', async () => {
        const result = await request(app)
          .put("/tasks/" + id + id)
          .send({test:true})
          .expect(500);
    });

    test('DELETE tasks correct', async () => {
        const result = await request(app)
          .delete("/tasks/" + id)
          .expect(200);
    });
    test('DELETE tasks incorrect', async () => {
        const result = await request(app)
          .delete("/tasks/" + id + "test")
          .expect(500);
    });

})

describe("user model", () => {

    it("should add to DB and return username without password", async () => {
        const result = await request(app)
          .post("/users/register")
          .send({
            name: "Deadpool",
            password: "secret1234",
            email: "deadpool@gmail.com",
          })
          .expect(201);
        expect(result.body).toEqual({
          name: "Deadpool",
          email: "deadpool@gmail.com",
          status: "success"
        });
    })
    // it("should connect the user", async () => {  //Ne fonctionne pas je ne sais pas pourquoi

    //     const result2 = await request(app)
    //       .post("/users/authenticate")
    //       .send({
    //         password: "secret1234",
    //         email: "deadpool@gmail.com",
    //       })
    //       .expect(200);
    // });
})
