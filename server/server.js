const express = require("express"),
    bodyParser = require("body-parser");


var {mongoose, ObjectID} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {ObjectID} = require("mongodb");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completeAt: req.body.completeAt
    });
    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    })

});
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get("/users/:id" , (req , res)=> {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
       return res.status(404).send({}); 
    }
    User.findById(id).then((docs) => {
        if(!docs) {
            return res.status(404).send({});
        }
        res.send(docs);
    })
    .catch((e) => {
        res.status(400).send({});
    });
});


app.listen("3000", () => {
    console.log("Started on port 3000")
});
module.exports = {app}
