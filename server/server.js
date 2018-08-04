// Requiring Packages
const express = require("express"),
    bodyParser = require("body-parser"),
    _ = require("lodash")


const port = process.env.PORT || 3000;

// Requiring Files
var {
    mongoose,
    ObjectID
} = require("./db/mongoose");
var {
    Todo
} = require("./models/todo");
var {
    User
} = require("./models/user");
var {
    ObjectID
} = require("mongodb");
var {
    authenticate
} = require("./middleware/authentication")




// Application Setup
var app = express();
app.use(bodyParser.json());

// //// Todo Routes

//Todo POST
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

// Todo Get
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

// Users GET using _id 
app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    Todo.findById(id).then((docs) => {
            if (!docs) {
                return res.status(404).send({});
            }
            res.send(docs);
        })
        .catch((e) => {
            res.status(400).send({});
        });
});
// Todo DELETE using _id
app.delete("/todos/:id", (req, res) => {
    var id = req.params.id
    if (ObjectID.isValid(id)) {
        Todo.findByIdAndRemove(id).then((doc) => {
            if (doc) {
                res.send({
                    doc
                })
            } else {
                res.status(404).send({});
            }
        }, (e) => {
            res.status(400).send({});
        });
    } else {
        res.status(400).send({});
    }

})

//Todo Patch using _id

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id,
        body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        res.status(400).send({})
    } else {
        if (body.completed) {
            body.completeAt = new Date().getTime();
        } else {
            body.completeAt = null;
        }
        Todo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send({})
        })
    }


})

// /// Users Routes

//Users GET by _id
app.get("/users/:id", (req, res) => {

    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    User.findById(id).then((docs) => {
            if (!docs) {
                return res.status(404).send({});
            }
            res.send(docs);
        })
        .catch((e) => {
            res.status(400).send({});
        });
});


//Users POST 

app.post("/users", (req, res) => {
    var body = _.pick(req.body, ["email", "password"])
    var user = new User(body);
    user.save().then((user) => {
        user.generateAuthToken();
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});





// Users GET by token
app.get("/getusers", authenticate, (req, res) => {
    res.send(req.user)
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
});

module.exports = {
    app
}
