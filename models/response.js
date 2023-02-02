const mongoose = require('mongoose');

// Response model
module.exports = mongoose.model('Response', new mongoose.Schema({
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    answers: [{
        type: String
    }]
}));