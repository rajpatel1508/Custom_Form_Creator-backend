const mongoose = require('mongoose');

// User model
module.exports = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}));