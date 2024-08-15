const express = require("express");
const route = express.Router();
const { login, register, checkuser } = require('../controller/userController')
const authMiddleware = require('../middleware/autoMiddleware')


//login router
route.post('/login', login);

//register router
route.post('/register', register);

//userCheck router
route.get('/check', authMiddleware, checkuser);


module.exports = route;