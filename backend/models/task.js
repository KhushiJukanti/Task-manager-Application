const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    description: String,
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },createdAt: { 
        type: Date, 
        default: Date.now 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }
});


module.exports = mongoose.model('Task', taskSchema)