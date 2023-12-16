// routes/content-routes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller.js');
const userMiddleware = require('../middleware/auth-middleware.js');
const userController = require('../controllers/user-controller.js');
const collectorController = require('../controllers/collector-controller.js');
const orderController = require('../controllers/order-controller.js');
const contentController = require('../controllers/content-controller.js');

// Route to create a content
router.post('/create', contentController.createContent);
// Route to show content
router.get('/', contentController.getContent);
// Route to show content based on ID (contentId)
router.get('/:id', contentController.getContentById); 
// Route to edit content based on ID (contentId)
router.put('/update/:id', contentController.updateContentById);
// Route to delete content based on ID (contentId)
router.delete('/delete/:id', contentController.deleteContentById);

module.exports = router;