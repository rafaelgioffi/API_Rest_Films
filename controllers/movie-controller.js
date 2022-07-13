const mysql = require('../mysql');

exports.getMovies = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM movies';
        const result = await mysql.execute(query)
        const response = {
            movies: result.map(movie => {
                return {
                    movieId: movie.movieId,
                    name: movie.movieTitle,
                    description: movie.movieDescription,
                    author: movie.movieAuthor
                }
            })
        }
        return res.status(200).send({response});
    } catch (error) {
        return res.status(400).send({ error: error })
    }
};

exports.getMovieById = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM movies WHERE movieId = ?;';
        const result = await mysql.execute(query, [req.params.filmId]);

        if (result.length == 0) {
            return res.status(404).send({
                movies: 'No movie found with this ID'
            })
        }

        const response = {
            film: {
                filmId: result[0].movieId,
                title: result[0].movieTitle,
                description: result[0].movieDescription,
                author: result[0].movieAuthor
            }
        }        
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.registerMovie = async (req, res, next) => {
    try {
        const query = 'INSERT INTO movies (movieTitle, movieDescription, movieAuthor) VALUES (?,?,?);'
        const result = await mysql.execute(query, [
            req.body.title,
            req.body.description,
            req.body.author
        ]);

        const response = {
            status: res.status,
            registeredMovie: {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author
            }
        }
        return res.status(201).send({ response });
    } catch (error) {
        return res.status(400).send({ error: error })
    }
}