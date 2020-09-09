const express = require('express');
const app = express();
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

const dotenv = require('dotenv')

// load dotenv
dotenv.config({ path: './config/config.env' });
const port = process.env.PORT;

// load database
connectDB();

// accept 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// route files
const routines = require('./routes/routines');

// body parser
app.use(express.json());

// mount router
app.use('/tracker/routines', routines);

app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`.blue.bold);
});

// handle erros
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error; ${err.message}`.red);
    // Close server
    server.close(() => process.exit(1));
})

