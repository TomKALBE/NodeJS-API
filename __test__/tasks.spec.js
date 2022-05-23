const mongoose = require("../config/database");
const request = require('supertest');
const express = require('express');
const tasks = require("../routes/tasks");
const url = mongoose.connection._connectionString;

const app = express();
app.use("/tasks", tasks);
app.use(express.json());

test("L'Addresse de la DB doit contenir nodejsapi mais pas dev ni prod", () => {
    expect(url).toMatch(/nodejsapi/);
    expect(url).not.toMatch(/dev/);
    expect(url).not.toMatch(/prod/);
});

describe("Task model", () => {
    let id = 0;
    test(`Recuperer les donnees sur l'url /tasks`, async () => {
        const res = await request(app)
         .get('/tasks')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        const data = JSON.parse(res.text)
        id = data.data.tasks[0].id;
    });
    test(`Recuperer les donnees sur l'url /tasks/id`, async () => {
        const res = await request(app)
         .get('/tasks/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
    test('Post tasks correct', function(done) {
        const data = {description : "test", done : false}
        request(app)
        .post('/')
        .send(data)
        .set('Accept', /application\/json/)
        .expect(201)
        .end(function (err, res) { done(); });
    });
    test('Post tasks incorrect', function(done) {
        const data = {description : "test"}
        request(app)
        .post('/')
        .send(data)
        .set('Accept', /application\/json/)
        .expect(500)
        .end(function (err, res) { done(); });
    });

})
  