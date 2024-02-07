const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userphone: {
        type: Number,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true
    },
    completed: {
        type: Number,
        require: true,
        default: 0
    },
    totaltasks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('User',userSchema);