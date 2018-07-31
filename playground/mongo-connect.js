var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://omarali:GGWP%40ZAUN2002@ds018258.mlab.com:18258/node-api-todo", (err, db) => {
    if (err) {
        return console.log("something went wrong !")
    }

    console.log("Connected to MongoDB");

//    db.collection("TODOS").insertOne({
//        text: "make a blogging platform"
//    }, (err, results) => {
//        if (err) {
//            console.log("Unable to insert the data ", err)
//        } else {
//            console.log("Succesfully inserted !", JSON.stringify(results.ops, undefined, 2))
//        }
//
//    });

    db.collection("Users").insertOne({
        name: "Omar Ali",
        age: 16,
        location: "Alexendria"
    }, (err, results) => {
        if (err) {
            console.log("Unable to insert data !")
        } else {
            console.log("Sucessfully inserted !", JSON.stringify(results.ops, undefined, 2))
        }
    });









    db.close();
});
