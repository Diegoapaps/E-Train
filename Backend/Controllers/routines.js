const Routine = require('../models/Routine');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getRoutines = asyncHandler(async (req, res, next) => {
    const routines = await Routine.find();

    res.status(200).json({ succes: true, count: routines.length, data: routines });
});

exports.getRoutine = asyncHandler(async (req, res, next) => {
    const routine = await Routine.findById(req.params.id);

    if (!routine) {
        return next(new ErrorResponse(`Rutina no encontrada con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: routine });
});

exports.createRoutine = asyncHandler(async (req, res, next) => {
    const routine = await Routine.create(req.body);

    res.status(201).json({
        succes: true,
        data: routine
    });
});

exports.updateRoutine = asyncHandler(async (req, res, next) => {
    const routine = await Routine.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!routine) {
        return next(new ErrorResponse(`Rutina no encontrada con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: routine });
});

exports.deleteRoutine = asyncHandler(async (req, res, next) => {
    const routine = await Routine.findByIdAndDelete(req.params.id);

    if (!routine) {
        return next(new ErrorResponse(`Rutina no encontrada con id de ${req.params.id}`, 404));
    }

    res.status(200).json({ succes: true, data: {} });
});