var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    username : {
        type: String
    },
    password : {
        type: String
    },
    role : {
        type: String,
        default: "USER"
    }
}, 'users');