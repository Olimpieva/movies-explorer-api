const router = require('express').Router();

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

router.all('*', (req, res) => console.log('Запрашиваемая страница не найдена.'));

module.exports = router;
