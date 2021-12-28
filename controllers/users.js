const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');
const { OK, errorMessages, noticeMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(OK).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    let err = error;

    if (error.name === 'ValidationError') {
      err = new BadRequestError(errorMessages.invalidCreateUserData);
    }
    if (error.code === 11000) {
      err = new ConflictError(errorMessages.userAlreadyExist);
    }

    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError(errorMessages.invalidAuthUserData);
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new UnauthorizedError(errorMessages.invalidAuthUserData);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, {
      maxAge: 3600000,
      sameSite: true,
      httpOnly: true,
    });

    res.status(OK).json({ token, message: noticeMessages.successLogin });
  } catch (error) {
    next(error);
  }

  return null;
};

module.exports.getUserInfo = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const userInfo = await User.findById(userId)
      .orFail(() => new NotFoundError(errorMessages.userNotFound));

    res.status(OK).send(userInfo);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  try {
    const updatedUserInfo = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => new NotFoundError(errorMessages.userNotFound));

    res.status(OK).send(updatedUserInfo);
  } catch (error) {
    let err = error;

    if (error.name === 'ValidationError') {
      err = new BadRequestError(errorMessages.invalidUpdateUserData);
    }
    if (error.code === 11000) {
      err = new ConflictError(errorMessages.userAlreadyExist);
    }

    next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    await res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    });

    res.status(OK).send({ message: noticeMessages.successLogout });
  } catch (error) {
    next(error);
  }
};
