const Excercise = require('../models/Excercise');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getExcercises = asyncHandler(async (req, res, next) => {
    const excercises = await Excercise.find();

    res.status(200).json({ succes: true, count: excercises.length, data: excercises });
});

exports.getExcercise = asyncHandler(async (req, res, next) => {
    const excercise = await Excercise.findById(req.params.id);

    if (!excercise) {
        return next(new ErrorResponse(`Ejercicio no encontrado con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: excercise });
});

exports.createExcercise = asyncHandler(async (req, res, next) => {
    const excercise = await Excercise.create(req.body);

    res.status(201).json({
        succes: true,
        data: excercise
    });
});

exports.updateExcercise = asyncHandler(async (req, res, next) => {
    const excercise = await Excercise.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!excercise) {
        return next(new ErrorResponse(`Ejercicio no encontrado con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: excercise });
});

exports.deleteExcercise = asyncHandler(async (req, res, next) => {
    const excercise = await Excercise.findByIdAndDelete(req.params.id);

    if (!excercise) {
        return next(new ErrorResponse(`Rutina no encontrada con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: {} });
});