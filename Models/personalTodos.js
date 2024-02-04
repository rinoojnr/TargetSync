const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoPersonSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Personaltodos',todoPersonSchema);