const express = require('express');

const {
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout } = require('../Controllers/workouts');

const router = express.Router();

router.route('/')
    .get(getWorkouts)
    .post(createWorkout);

router.route('/:id')
    .get(getWorkout)
    .put(updateWorkout)
    .delete(deleteWorkout);

module.exports = router;