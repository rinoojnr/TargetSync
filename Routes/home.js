const express = require('express');

const homeController = require('../Controllers/home');

const router = express.Router();

router.get('/home',homeController.home)

module.exports = router;