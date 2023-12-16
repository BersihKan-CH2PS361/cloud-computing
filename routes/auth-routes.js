// routes/auth-routes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller.js');
const userMiddleware = require('../middleware/auth-middleware.js');
const userController = require('../controllers/user-controller.js');
const collectorController = require('../controllers/collector-controller.js');
const orderController = require('../controllers/order-controller.js');
const contentController = require('../controllers/content-controller.js');

// Route to register user
router.post('/register-user', userMiddleware.validateRegister, authController.registerUser);
// Route to register collector
router.post('/register-collector', userMiddleware.validateRegister, authController.registerCollector);
// Route to log in
router.post('/login', authController.loginUser);
// Route to log out
router.post('/logout', userMiddleware.isLoggedIn, authController.logoutUser);

module.exports = router;