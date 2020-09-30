const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    exercises: String
});

module.exports = mongoose.model('Workout', WorkoutSchema);