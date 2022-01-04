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
  pageNotFound: 'Запрашиваемая страница не найдена.',
};

const validationErrorMessages = {
  nameRequired: 'Поле "name" должно быть заполнено.',
  nameMinLength: 'Поле "name" должно содержать минимум 2 символа.',
  nameMaxLength: 'Поле "name" должно содержать максимум 30 символов.',
  emailRequired: 'Поле "email" должно быть заполнено.',
  emailInvalidUrl: 'Поле "email" должно быть валидным адресом.',
  passwordRequired: 'Поле "password" должно быть заполнено.',
  movieIdRequired: 'Поле "movieId" должно быть заполнено.',
  movieIdInvalid: 'Поле "movieId" должно быть валидным id.',
  nameRuRequired: 'Поле "nameRu" должно быть заполнено.',
  nameEnRequired: 'Поле "nameEn" должно быть заполнено.',
  descriptionRequired: 'Поле "description" должно быть заполнено.',
  durationRequired: 'Поле "duration" должно быть заполнено.',
  yearRequired: 'Поле "year" должно быть заполнено.',
  countryRequired: 'Поле "country" должно быть заполнено.',
  directorRequired: 'Поле "director" должно быть заполнено.',
  imageRequired: 'Поле "image" должно быть заполнено.',
  imageInvalidUrl: 'Поле "image" должно быть валидным адресом.',
  trailerRequired: 'Поле "trailer" должно быть заполнено.',
  trailerInvalidUrl: 'Поле "trailer" должно быть валидным адресом.',
  thumbnailRequired: 'Поле "thumbnail" должно быть заполнено.',
  thumbnailInvalidUrl: 'Поле "thumbnail" должно быть валидным адресом.',
};

const noticeMessages = {
  successLogin: 'Авторизация прошла успешно.',
  successLogout: 'Выход из системы прошёл успешно.',
};

module.exports = {
  urlServer,
  OK,
  errorMessages,
  validationErrorMessages,
  noticeMessages,
};
