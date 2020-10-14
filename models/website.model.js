const mongoose = require('mongoose');

const websiteModel = mongoose.Schema({
    name: {type: String, required: true},
    date_in: {type: Date, required: true},
    last_payment: {type: Date, required: true},
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    isActive: {type: Boolean, required: true, default: false},
    pages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'page'
        }
    ]
});

module.exports = mongoose.model('website', websiteModel);