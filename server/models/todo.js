var mongoose = require("mongoose")
var todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim : true ,
        minLength : 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completeAt: {
        type: Number,
        default: null
    }
} , {
      usePushEach: true
});
var Todo = mongoose.model("Todo", todoSchema);

module.exports.Todo = Todo;