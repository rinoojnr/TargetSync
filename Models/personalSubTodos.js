const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subTodoSchema = new Schema({
    personalId: {
        type: Schema.Types.ObjectId,
        ref: 'Personaltodos',
        required: true
    },
    isCompleted: {
        type: String,
        required: true
    },
    todos: {
        type: String
    }
});

module.exports = mongoose.model('Subtodos',subTodoSchema);