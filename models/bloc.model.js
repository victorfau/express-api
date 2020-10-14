const mongoose = require('mongoose');

const BlocModel = mongoose.Schema({
    order: {type: Number, required: true},
    type: { type: String, required: true},
    content: {type: Object, required: false},
    page: {
        type: mongoose.Types.ObjectId,
        ref: 'page'
    }
});

module.exports = mongoose.model('bloc', BlocModel);