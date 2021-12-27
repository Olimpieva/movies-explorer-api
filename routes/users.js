const routerUsers = require('express').Router();

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

routerUsers.get('/users/me', getUserInfo);
routerUsers.patch('/users/me', updateUserInfo);

module.exports = routerUsers;
