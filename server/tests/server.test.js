const expect = require("expect"),
    request = require("supertest"),
    express = require("express"),
    {
        app
    } = require("../server"),
    {
        Todo
    } = require("../models/todo.js");

beforeEach((done) => {
    Todo.remove({}).then(() => done());
})
describe("GET //TODOS", () => {
    it("should test something", (done) => {
        var text = "test the app 2"
        request(app)
            .post("/todos")
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    Todo.find().then((docs) => {
                        expect(docs.length).toBe(1);
                        expect(docs[0].text).toBe(text);
                        done();
                    }).catch((e) => done(e))
                }
            })
    });







    it("should not send in the case of invalid data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done();
                } else {
                    Todo.find().then((docs) => {
                            expect(docs.length).toBe(0);
                            done()
                        })
                        .catch((e) => {
                            done(e);
                        })
                }
            });
    });









});
