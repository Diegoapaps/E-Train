const express = require('express');

const {
    getRoutine,
    getRoutines,
    createRoutine,
    updateRoutine,
    deleteRoutine } = require('../Controllers/routines');

const router = express.Router();

router.route('/')
    .get(getRoutines)
    .post(createRoutine);

router.route('/:id')
    .get(getRoutine)
    .put(updateRoutine)
    .delete(deleteRoutine);

module.exports = router;