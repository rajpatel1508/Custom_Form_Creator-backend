const mongoose = require('mongoose');

// Form model
module.exports = mongoose.model('Form', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fields: [{
        type: String,
        required: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));