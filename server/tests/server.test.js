const expect = require("expect"),
    request = require("supertest"),
    express = require("express"),
    {
        app
    } = require("../server"),
    {
        Todo
    } = require("../models/todo.js");
var todos = [{
    text: "Test text 1"
}, {
    text: "Test text 2"
}];
beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
        done();
    });
})
describe("POST //TODOS", () => {
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
                        expect(docs.length).toBe(3);
                        expect(docs[2].text).toBe(text);
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
                            expect(docs.length).toBe(2);
                            done()
                        })
                        .catch((e) => {
                            done(e);
                        })
                }
            });
    });

});
describe("get //TODOS", () => {
            it("should get some data" , (done) => {
                request(app)
                .get("/todos")
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2)
                })
                .end(done);
            });
});
