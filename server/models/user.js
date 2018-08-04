const mongoose = require("mongoose"),
    validator = require("validator"),
    jwt = require("jsonwebtoken"),
    _ = require("lodash"),
    bcrypt = require("bcryptjs");

mongoose.plugin(schema => {
    schema.options.usePushEach = true
})

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a vaild Email"
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        access: {
            required: true,
            type: String
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {
    usePushEach: true
});



// userSchema Methods
userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ["email", "_id"])
}
userSchema.methods.generateAuthToken = function () {
    var user = this,
        access = "auth",
        token = jwt.sign({
            _id: this._id.toHexString()
        }, "313").toString();

    user.tokens = user.tokens.concat({
        access,
        token
    });
    return user.save().then(() => {
        return new Promise((resolve, reject) => {
            resolve(token);
        });
    }, (e) => {
        return e;
    })
}
// userSchema Statics
userSchema.statics.findByToken = function (token) {
    var user = this;
    var decoded;
    try {
        decoded = jwt.verify(token, "313");
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject();
        })
    }
    return User.findOne({
        _id: decoded._id,
        "tokens.access": "auth",
        "tokens.token": token
    })

}


userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next();
            });
        })
    } else {
        next();
    }
})






var User = mongoose.model("User", userSchema);

module.exports.User = User;
