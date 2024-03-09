const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
