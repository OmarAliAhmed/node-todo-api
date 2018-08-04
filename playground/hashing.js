const{SHA256} = require("crypto-js"),
      jwt = require("jsonwebtoken")
var data = {
    name : "Omar Ali",
    age : "16",
    hometown : "Alexendria"
}
var token = jwt.sign(data, "123abc");

console.log(token)
