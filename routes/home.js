//setup up express
const express = require('express');
const router= express.Router();
//get our controller logic
const homeController = require('../controllers/home');

router.get('/', homeController.homePage);



exports.routes = router;
