var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    name : {
        type: String,
        default: ''
    },
    completed : {
        type: Boolean,
        default: false
    }
},'JoJo-todo');


