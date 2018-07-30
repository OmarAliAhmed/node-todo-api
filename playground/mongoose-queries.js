const {mongoose} = require("../server/db/mongoose"),
      {User} = require("../server/models/user");




User.findById("5b5b8c33f45a1fa40b018f8f").then((docs) => {
    if(!docs) {
        console.log("Id not found")
    } else {
        console.log(docs)
    }
}).catch((e) => {console.log(e)})
