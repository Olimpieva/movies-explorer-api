const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');

const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');

router.post(
  '/signup',
  createUser,
);

router.post(
  '/signin',
  login,
);

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.get('/signout', logout);

router.all('*', (req, res, next) => next(new NotFoundError(errorMessages.pageNotFound)));

module.exports = router;
