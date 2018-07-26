var {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("something went wrong !")
    }

    console.log("Connected to MongoDB");

//db.collection("TODOS").find({completed : false}).toArray().then((data) => {
//    console.log("Todos")
//    console.log(JSON.stringify(data, undefined , 2))
//} , (err) => {
//    console.log(err);
//})

db.collection("Users").find({name : "Marshall Mathers"}).count().then((count) =>{
    console.log(`Count is ${count}`)
} , (err) => {
    console.log("Something went wrong", err)
});
    
});

