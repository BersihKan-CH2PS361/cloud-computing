// routes/user-routes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller.js');
const userMiddleware = require('../middleware/auth-middleware.js');
const userController = require('../controllers/user-controller.js');
const collectorController = require('../controllers/collector-controller.js');
const orderController = require('../controllers/order-controller.js');
const contentController = require('../controllers/content-controller.js');

// Route to retrieve/show user profile by ID (userId)
router.get('/:id', userMiddleware.userAuthorization('user'), userController.getUserProfileById);
// Route to update user profile by ID (userId)
router.put('/update-profile/:id', userMiddleware.userAuthorization('user'), userController.updateUserProfile);

module.exports = router;