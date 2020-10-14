const mongoose = require('mongoose');

const PageModel = mongoose.Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: false},
    blocs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'bloc',
            default: []
        }
    ]
});

module.exports = mongoose.model('page', PageModel);