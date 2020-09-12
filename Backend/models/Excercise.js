const mongoose = require('mongoose');

const ExcerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    muscles: {
        type: [String],
        required: true,
        enum: [
            'Chest',
            'Triceps',
            'Shoulders',
            'Biceps',
            'Back',
            'Quads',
            'Hamstrings',
            'Calves',
            'Abs',
            'Glutes'
        ]
    }
});

module.exports = mongoose.model('Excercise', ExcerciseSchema);