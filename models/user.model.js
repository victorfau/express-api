const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    websites: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'website'
        }
    ]
});

module.exports = mongoose.model('user', UserModel);