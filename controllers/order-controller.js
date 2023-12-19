// controllers/order-controller.js

const db = require('../lib/db.js');

module.exports = {
    createOrder: (req, res) => {
        const userId = req.params.id;
        const { facilityId, waste_type, waste_qty, user_notes, recycle_fee, pickup_fee, pickup_latitude, pickup_longitude } = req.body;

        if(!userId || !facilityId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID or facility ID',
            });
        }

        const order_status = 'pick_up';
        const subtotal_fee = (Number(recycle_fee)*Number(waste_qty)) + Number(pickup_fee);
        const insertQuery = `INSERT INTO orders (user_id, facility_id, waste_type, waste_qty, user_notes, recycle_fee, pickup_fee, subtotal_fee, order_status, order_datetime, pickup_datetime, pickup_latitude, pickup_longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?)`;
        db.query(insertQuery, [userId, facilityId, waste_type, waste_qty, user_notes, recycle_fee, pickup_fee, subtotal_fee, order_status, pickup_latitude, pickup_longitude], (error) => {
            if (error) {
                console.error('Error inserting order:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            res.status(201).json({
                message: 'Order added successfully',
            });
        });
    },

    getOrderDetail: (req, res) => {
        const orderId = req.params.id;

        if(!orderId){
            return res.status(400).json({
                error: 'Bad request: Missing order ID',
            });
        }

        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name AS collector_name, 
        (SELECT name FROM users WHERE id = orders.user_id) AS user_name,
        (SELECT phone FROM users WHERE id = orders.user_id) AS user_phone 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.id = ?`;
            
        db.query(getUserOrder, [orderId], (error, results) => {
            if (error) {
                console.error('Error retrieving order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'No order data not found',
                })
            }
            const userOrderDetail = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                collector_name: order.collector_name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderDetail);
        });
    },

    getAllOrderDataPickUp: (req, res) => {
        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name AS collector_name, 
        (SELECT name FROM users WHERE id = orders.user_id) AS user_name,
        (SELECT phone FROM users WHERE id = orders.user_id) AS user_phone 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.order_status = 'pick_up'`;
            
        db.query(getUserOrder, (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                collector_name: order.collector_name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderData);
        });
    },

    getAllOrderDataArrived: (req, res) => {
        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name AS collector_name, 
        (SELECT name FROM users WHERE id = orders.user_id) AS user_name,
        (SELECT phone FROM users WHERE id = orders.user_id) AS user_phone 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.order_status = 'arrived'`;
            
        db.query(getUserOrder, (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                collector_name: order.collector_name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderData);
        });
    },

    getAllOrderDataDelivering: (req, res) => {
        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name AS collector_name, 
        (SELECT name FROM users WHERE id = orders.user_id) AS user_name,
        (SELECT phone FROM users WHERE id = orders.user_id) AS user_phone 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.order_status = 'delivering'`;
            
        db.query(getUserOrder, (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                collector_name: order.collector_name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderData);
        });
    },

    getAllOrderDataDelivered: (req, res) => {
        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name AS collector_name, 
        (SELECT name FROM users WHERE id = orders.user_id) AS user_name,
        (SELECT phone FROM users WHERE id = orders.user_id) AS user_phone 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.order_status = 'delivered'`;
            
        db.query(getUserOrder, (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                collector_name: order.collector_name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderData);
        });
    },

    updateOrderStatus: (req, res) => {
        const orderId = req.params.id;

        if(!orderId){
            return res.status(400).json({
                error: 'Bad request: Missing order ID',
            });
        }

        const { order_status } = req.body;

        const updateQuery = `UPDATE orders SET order_status = ?, pickup_datetime = now() WHERE id = ?`;

        db.query(updateQuery, [order_status, orderId], (error) => {
            if(error) {
                console.error('Error updating order status:', error);
                return res.status(500).json({
                    error: 'An internal server error has occured',
                });
            }
            res.status(200).json({
                message: 'Order status updated successfully',
            });
        });
    },

    getAllOrderData: (req, res) => {
        const getUserOrder = `SELECT orders.*, users.name AS user_name, users.phone AS user_phone 
        FROM orders 
        LEFT JOIN users ON orders.user_id = users.id 
        WHERE order_status = 'pick_up'`;
            
        db.query(getUserOrder, (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
            }));
            res.status(200).json(userOrderData);
        });
    },

    getOrderHistoryUser: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.user_id = ? AND orders.order_status = 'delivered'`;
            
        db.query(getUserOrder, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'No order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                collector_name: order.name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderData);
        });
    },

    getAllOrderDataUser: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const getUserOrder = `SELECT orders.*, facilities.facility_name, users.name AS collector_name
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.facility_id = users.id 
        WHERE orders.user_id = ? AND orders.order_status != 'delivered'`;
            
        db.query(getUserOrder, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'No order data not found',
                })
            }
            const userOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                collector_name: order.collector_name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(userOrderData);
        });
    },

    getAllOrderDataCollector: (req, res) => {
        const facilityId = req.params.id;

        if(!facilityId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const getCollectorOrder = `SELECT orders.*, facilities.facility_name, users.name AS user_name, users.phone AS user_phone 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.user_id = users.id 
        WHERE orders.facility_id = ? AND orders.order_status != 'delivered'`;
            
        db.query(getCollectorOrder, [facilityId], (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'No order data not found',
                })
            }
            const collectorOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.user_name,
                user_phone: order.user_phone,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(collectorOrderData);
        });
    },

    getOrderHistoryCollector: (req, res) => {
        const facilityId = req.params.id;

        if(!facilityId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const getCollectorOrder = `SELECT orders.*, facilities.facility_name, users.name 
        FROM orders 
        LEFT JOIN facilities ON orders.facility_id = facilities.user_id 
        LEFT JOIN users ON orders.user_id = users.id 
        WHERE orders.facility_id = ? AND orders.order_status = 'delivered'`;
            
        db.query(getCollectorOrder, [facilityId], (error, results) => {
            if (error) {
                console.error('Error retrieving user order data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'No order data not found',
                })
            }
            const collectorOrderData = results.map(order => ({
                order_id: order.id,
                user_id: order.user_id,
                collector_id: order.facility_id,
                user_name: order.name,
                waste_type: order.waste_type,
                waste_qty: order.waste_qty,
                user_notes: order.user_notes,
                recycle_fee: order.recycle_fee,
                pickup_fee: order.pickup_fee,
                subtotal_fee: order.subtotal_fee,
                order_status: order.order_status,
                order_datetime: order.order_datetime,
                pickup_datetime: order.pickup_datetime,
                pickup_latitude: order.pickup_latitude,
                pickup_longitude: order.pickup_longitude,
                facility_name : order.facility_name,
            }));
            res.status(200).json(collectorOrderData);
        });
    }
}
