const express = require('express');
const router = express.Router();

const login = require('../middleware/login');
const MovieController = require('../controllers/movie-controller');

router.get('/', MovieController.getMovies);
router.get('/:filmId', MovieController.getMovieById);

router.post('/', login.required, MovieController.registerMovie);

module.exports = router;