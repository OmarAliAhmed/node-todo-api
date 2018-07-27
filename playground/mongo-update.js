var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("something went wrong !")
    }

    console.log("Connected to MongoDB");

db.collection("Users").findOneAndUpdate({name : "Asser Ali"} , {
    $inc : {
        age : 7
    }
} , {
    returnOriginal : false
}).then((results) => {
    console.log(results.value)
})
    db.close();
});
