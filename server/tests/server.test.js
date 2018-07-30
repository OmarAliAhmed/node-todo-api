const expect = require("expect"),
    request = require("supertest"),
    express = require("express"),
    {
        app
    } = require("../server"),
    {
        Todo
    } = require("../models/todo.js"),
      {ObjectID} = require("mongodb");
var todos = [{
    text: "Test text 1",
    _id : new ObjectID()
}, {
    text: "Test text 2",
    _id : new ObjectID()
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

describe("get todos by id" , () => {
//    it("should test the Get by ID" , (done) => {
//        request(app)
//        .get(`todos/${todos[0]._id.toHexString()}`)
//        .expect(200)
//        .expect((res) => {
//            res.body.todo.text = todos[0].text;
//        } )
//        .end(done);
//    })d
    it("should get 404 for non valid ID" , (done) => {
        request(app)
        .get("/todos/123")
        .expect(404)
        .end(done)
    })
        it("should get 404 for non-found ID" , (done) => {
        request(app)
        .get("/todos/5b5f48f64083a812306d0db6")
        .expect(404)
        .end(done)
    })
})