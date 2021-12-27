const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    console.log(user);

    // "_id": "61c9e0e916d131e5266541ad",

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email }).select('+password');

    console.log(user);

    if (!user) {
      return console.log('Error email');
    }

    const isMatched = await bcrypt.compare(password, user.password);

    console.log(isMatched);

    if (!isMatched) {
      return console.log('Error passsword');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
      { expiresIn: '7d' },
    );

    console.log(token);

    res.cookie('jwt', token, {
      maxAge: 3600000,
      sameSite: true,
      httpOnly: true,
    });

    res.status(200).json({ token, message: 'Авторизация прошла успешно.' });
  } catch (error) {
    console.log(error);
  }
  return null;
};

module.exports.getUserInfo = async (req, res) => {
  console.log(req.user);
  const userId = req.user._id;

  try {
    const userInfo = await User.findById(userId)
      .orFail((error) => console.log(error));

    res.status(200).send(userInfo);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateUserInfo = async (req, res) => {
  console.log(req.user);
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
    ).orFail((error) => console.log(error));

    res.status(200).send(updatedUserInfo);
  } catch (error) {
    console.log(error);
  }
};
