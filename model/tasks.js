const mongoose = require('mongoose');
const taskSchema= new mongoose.Schema({

    taskTitle: {
        type: String,
        unique: true,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
 
    tag:{
        type: String,
        required: true,
        enum:['urgent','important','severe']
    
    },
},  {timestamps: true}
);
module.exports = mongoose.model('Task', taskSchema);