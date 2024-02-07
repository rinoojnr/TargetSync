const express = require('express');

const homeController = require('../Controllers/home');
const authenticationMiddileware = require('../Middilewares/authentication');

const router = express.Router();

router.get('/home',homeController.home);
router.get('/gettodos',authenticationMiddileware.authentication,homeController.getTodo);
router.post('/createtodos',authenticationMiddileware.authentication,homeController.forPerson);
router.post('/createsubtodos',authenticationMiddileware.authentication,homeController.forPersonSubtodos);
router.delete('/deletetodos/:id',authenticationMiddileware.authentication,homeController.deleteTodos);
router.patch('/completetask/:id',authenticationMiddileware.authentication,homeController.isCompleted);

module.exports = router;