const routerMovies = require('express').Router();

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

routerMovies.get('/movies', getMovies);
routerMovies.post('/movies', createMovie);
routerMovies.delete('/movies/:movieId', removeMovie);

module.exports = routerMovies;
