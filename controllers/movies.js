const Movie = require('../models/movie');

module.exports.getMovies = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);

  try {
    const allMovies = await Movie.find({});
    console.log(allMovies);

    console.log(allMovies);

    const savedMovies = allMovies.filter((movie) => movie.owner.toString() === userId.toString());

    console.log(savedMovies);
    res.status(200).send(savedMovies);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createMovie = async (req, res) => {
  const owner = req.user._id;
  const {
    movieId,
    nameRU,
    nameEN,
    description,
    duration,
    year,
    country,
    director,
    image,
    trailer,
    thumbnail,
  } = req.body;

  try {
    const movie = await Movie.create({
      movieId,
      nameRU,
      nameEN,
      description,
      duration,
      year,
      country,
      director,
      image,
      trailer,
      thumbnail,
      owner,
    });

    console.log(movie);

    res.status(200).send(movie);
  } catch (error) {
    console.log(error);
  }
};

module.exports.removeMovie = async (req, res) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId)
      .orFail((error) => console.log(error));

    console.log(movie.owner.toString);
    console.log({ userId });

    if (movie.owner.toString() !== userId) {
      return console.log('You can\'t do that!');
    }

    await movie.remove();

    res.status(200).send(movie);
  } catch (error) {
    console.log(error);
  }
  return null;
};
