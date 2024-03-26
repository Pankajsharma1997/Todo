const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema
    ({
        name :{
            type: String,
            required:true
        },
        task: {
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        date:{
            type:Date
        },
        completed:{
            type: Boolean,
            default:false
        }

});
const TodoModel =  mongoose.model('todos', todoSchema);
module.exports = TodoModel;