const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log(err.stack);

    // Mongoose id mal formateado
    if (err.name === 'CastError') {
        const message = `Peleador con id de ${err.value} no encontrado`;
        error = new ErrorResponse(message, 404);
    }

    // mongoose peleador ya existente
    if (err.code === 11000) {
        const message = 'Peleador ya existente';
        error = new ErrorResponse(message, 400)
    }

    // mongoose error de validación
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        succes: false,
        error: error.message || 'Error del Servidor'
    });
}

module.exports = errorHandler;