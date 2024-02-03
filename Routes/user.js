const express = require('express');

const userController = require('../Controllers/user');

const router = express.Router();

router.post('/login',userController.login);
router.post('/signup',userController.signUp);

module.exports = router;