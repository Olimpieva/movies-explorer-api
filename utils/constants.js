const urlServer = 'mongodb://localhost:27017/moviesdb';
const OK = 200;
const errorMessages = {
  serverError: 'Произошла ошибка на сервере.',
  userNotFound: 'Пользователь с указанным id не найден.',
  invalidCreateUserData: 'Переданы некорректные данные при создании пользователя.',
  invalidAuthUserData: 'Переданы некорректные данные при авторизации пользователя.',
  invalidUpdateUserData: 'Переданы некорректные данные при обновлении профиля.',
  userAlreadyExist: 'Пользователь с таким e-mail уже зарегистрирован.',
  movieNotFound: 'Фильм с указанным id не найден.',
  invalidCreateMovieData: 'Переданы некорректные данные при создании фильма.',
  noAccess: 'Нет прав для удаления фильма.',
  needAuth: 'Необходима авторизация.',
};

const noticeMessages = {
  successLogin: 'Авторизация прошла успешно.',
  successLogout: 'Выход из системы прошёл успешно.',
};

module.exports = {
  urlServer,
  OK,
  errorMessages,
  noticeMessages,
};
