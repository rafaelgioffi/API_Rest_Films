const express = require('express');
const app = express();
const morgan = require('morgan');   //monitora todos os pedidos
const bodyParser = require('body-parser');

const movieRoute = require('./routes/movies');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/movies', movieRoute);

// quando não encontra a rota...
app.use((req, res, next) => {
    const error = new Error('General error. Please contact system administrator');
    error.status = 404;
    next(error);
});

//timeout
app.use((error, req, res, next) => {
    res.status(error.status || 400);
    return res.send({
        error: {
            message: error.message
        }
    });
});

module.exports = app;