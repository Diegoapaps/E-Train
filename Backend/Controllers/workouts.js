const Workout = require('../models/Workout');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getWorkouts = asyncHandler(async (req, res, next) => {
    const workouts = await Workout.find();

    res.status(200).json({ succes: true, count: workouts.length, data: workouts });
});

exports.getWorkout = asyncHandler(async (req, res, next) => {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
        return next(new ErrorResponse(`Entrenamiento no encontrado con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: workout });
});

exports.createWorkout = asyncHandler(async (req, res, next) => {
    const workout = await Workout.create(req.body);

    res.status(201).json({
        succes: true,
        data: workout
    });
});

exports.updateWorkout = asyncHandler(async (req, res, next) => {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!workout) {
        return next(new ErrorResponse(`Entrenamiento no encontrado con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: workout });
});

exports.deleteWorkout = asyncHandler(async (req, res, next) => {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
        return next(new ErrorResponse(`Rutina no encontrada con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: {} });
});