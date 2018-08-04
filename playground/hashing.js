const{SHA256} = require("crypto-js"),
      jwt = require("jsonwebtoken"),
      bcrypt = require("bcryptjs");

var password = "GGWP@ZAUN2002"

bcrypt.genSalt(10, password , (err, salt) => {
    bcrypt.hash(password , salt , (err, hash) => {
        console.log(hash)
    })
    
})
