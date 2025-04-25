const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Please add a task title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']


    },
    description: {
        type: String, 
        required: false,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },

    priority: {
        type: Number,
        default: 3, //3 will be considered the lowest priority
        min: 1,
        max: 3
        //1 - Highest Priority 2 - Medium Priority 3 - Lowest Priority
    },

    status: {
        type: String, 
        enum: ['To do', 'In Progress', 'Completed'],
        default: 'To do'
    },

    dueDate: {
        type: Date,
        required: false
    },

    estimatedTime: {
        type: Number,
        required: false
    }, 

    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);