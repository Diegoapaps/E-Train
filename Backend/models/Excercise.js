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
            'Pecho',
            'Tríceps',
            'Hombros',
            'Bíceps',
            'Espalda',
            'Quads',
            'Femoral',
            'Pantorilla',
            'Abs',
            'Glúteos'
        ]
    }
});

module.exports = mongoose.model('Excercise', ExcerciseSchema);