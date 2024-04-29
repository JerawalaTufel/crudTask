const Mongoose  = require("mongoose");

 const Task = new Mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    number : {
        type: String,
        require: true
    }
 }, {
    timestamps : true
  })

 exports.Task = Mongoose.model('Task' , Task)