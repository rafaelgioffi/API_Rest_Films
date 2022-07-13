const express = require('express');
const router = express.Router();

const MovieController = require('../controllers/movie-controller');

router.get('/', MovieController.getMovies);
router.get('/:filmId', MovieController.getMovieById);

router.post('/', MovieController.registerMovie);

module.exports = router;