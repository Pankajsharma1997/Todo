const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema
    ({
        task: {
            type:String,
            required:true
        },
        completed:{
            type: Boolean,
            default:false
        }

});
const TodoModel =  mongoose.model('todos', todoSchema);
module.exports = TodoModel;