// routes/order-routes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller.js');
const userMiddleware = require('../middleware/auth-middleware.js');
const userController = require('../controllers/user-controller.js');
const collectorController = require('../controllers/collector-controller.js');
const orderController = require('../controllers/order-controller.js');
const contentController = require('../controllers/content-controller.js');

// Route to get all order with 'pick_up' status
router.get('/pickup', userMiddleware.userAuthorization('collector'), orderController.getAllOrderDataPickUp);
// Route to get all order with 'arrived' status
router.get('/arrived', userMiddleware.userAuthorization('collector'), orderController.getAllOrderDataArrived);
// Route to get all order with 'delivering' status
router.get('/delivering', userMiddleware.userAuthorization('collector'), orderController.getAllOrderDataDelivering);
// Route to get all order with 'delivered' status
router.get('/delivered', userMiddleware.userAuthorization('collector'), orderController.getAllOrderDataDelivered);

// Route to create order by ID (userId)
router.post('/create/:id', userMiddleware.userAuthorization('user'), orderController.createOrder); //userId
// Route to get all order data by ID (orderId)
router.get('/:id', orderController.getOrderDetail); //orderId
// Route to update order status by ID (orderId)
router.put('/update-status/:id', userMiddleware.userAuthorization('collector'), orderController.updateOrderStatus); //orderId
// Route to get order data  with 'delivered' status
router.get('/history-user/:id', userMiddleware.userAuthorization('user'), orderController.getOrderHistoryUser); //userId
// Route to get order data  with 'delivered' status
router.get('/history-collector/:id', userMiddleware.userAuthorization('collector'), orderController.getOrderHistoryCollector); //collectorId
// Route to get order data  with other than 'delivered' status based on collector ID
router.get('/orderdata-collector/:id', userMiddleware.userAuthorization('collector'), orderController.getAllOrderDataCollector); //collectorId
// Route to get order data  with other than 'delivered' status based on user ID
router.get('/orderdata-user/:id', userMiddleware.userAuthorization('user'), orderController.getAllOrderDataUser); //userId

module.exports = router;