const express = require('express');

const {
    getExcercise,
    getExcercises,
    createExcercise,
    updateExcercise,
    deleteExcercise } = require('../Controllers/excercises');

const router = express.Router();

router.route('/')
    .get(getExcercises)
    .post(createExcercise);

router.route('/:id')
    .get(getExcercise)
    .put(updateExcercise)
    .delete(deleteExcercise);

module.exports = router;