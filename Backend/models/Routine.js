const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    excercises: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Routine', RoutineSchema);