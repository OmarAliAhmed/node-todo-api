var {
    MongoClient,
    ObjectID
} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    
    if (err) {
        return console.log("something went wrong !")
    }
    
    console.log("Connected to MongoDB");
    
    
    
    db.collection("TODOS").deleteMany({
        text: "Eat dinner !"
    }).then((results) => {
        console.log(results);
    });

    db.collection("TODOS").deleteMany({
        text: "Fuck my life"
    }).then((results) => {
        console.log(results);
    }, (err) => {
        console.log("Something went wrong !", err);
    });
    db.collection("Users").findOneAndDelete({
        _id :new ObjectID("5b59edfefd6bc809902e8b61")
    }).then((results) => {
        console.log(results.value)
    })
});
