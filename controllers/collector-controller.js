// controllers/collector-controller.js

const db = require('../lib/db.js');

module.exports = {
    getCollectorProfile: (req, res) => {
        const userId  = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const selectQuery = `SELECT * FROM users WHERE id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user profile:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            const collectorProfile = results[0];          
            const sanitizedProfile = {
                id: collectorProfile.id,
                username: collectorProfile.username,
                email: collectorProfile.email,
                phone: collectorProfile.phone,
                role: collectorProfile.role,
                name: collectorProfile.name,
            };
            res.status(200).json(sanitizedProfile);
        });
    },

    updateCollectorProfile: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { phone, name } = req.body;

        const updateQuery = `UPDATE users SET phone = ?, name = ? WHERE id = ?`;

        db.query(updateQuery, [phone, name, userId], (error) => {
            if(error) {
                console.error('Error updating facility profile:', error);
                return res.status(500).json({
                    error: 'An internal server error has occured',
                });
            }
            res.status(200).json({
                message: 'Profile updated successfully',
            });
        });
    },

    updateDropLocation: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { drop_latitude, drop_longitude } = req.body;

        // Check if data for the user already exists in collectors table
        const selectQuery = `SELECT * FROM facilities WHERE user_id = ?`;
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error checking facility data:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            if (results && results.length > 0) {
                // Data already exists, perform UPDATE
                const updateQuery = `UPDATE facilities SET drop_latitude = ?, drop_longitude = ? WHERE user_id = ?`;
                db.query(updateQuery, [drop_latitude, drop_longitude, userId], (error) => {
                    if (error) {
                        console.error('Error updating facility drop location:', error);
                        return res.status(500).json({
                            error: 'An internal server error has occurred',
                        });
                    }
                    res.status(200).json({
                        message: 'Facility drop location updated successfully',
                    });
                });
            } else {
                // Data doesn't exist, perform INSERT
                const insertQuery = `INSERT INTO facilities (user_id, drop_latitude, drop_longitude) VALUES (?, ?, ?)`;
                db.query(insertQuery, [userId, drop_latitude, drop_longitude], (error) => {
                    if (error) {
                        console.error('Error inserting facility drop location:', error);
                        return res.status(500).json({
                            error: 'An internal server error has occurred',
                        });
                    }
                    res.status(201).json({
                        message: 'Facility drop location added successfully',
                    });
                });
            }
        });
    },

    updateCurrentLocation: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { current_latitude, current_longitude } = req.body;

        // Check if data for the user already exists in collectors table
        const selectQuery = `SELECT * FROM facilities WHERE user_id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error checking facility data:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            if (results && results.length > 0) {
                // Data already exists, perform UPDATE
                const updateQuery = `UPDATE facilities SET current_latitude = ?, current_longitude = ? WHERE user_id = ?`;
                db.query(updateQuery, [current_latitude, current_longitude, userId], (error) => {
                    if (error) {
                        console.error('Error updating facility current location:', error);
                        return res.status(500).json({
                            error: 'An internal server error has occurred',
                        });
                    }
                    res.status(200).json({
                        message: 'Facility current location updated successfully',
                    });
                });
            }
        });
    },

    updateCollectorId: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { id } = req.body;

        // Check if data for the user already exists in collectors table
        const selectQuery = `SELECT * FROM facilities WHERE user_id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error checking facility data:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            if (results && results.length > 0) {
                // Data already exists, perform UPDATE
                const updateQuery = `UPDATE facilities SET id = ? WHERE user_id = ?`;
                db.query(updateQuery, [id, userId], (error) => {
                    if (error) {
                        console.error('Error updating facility ID:', error);
                        return res.status(500).json({
                            error: 'An internal server error has occurred',
                        });
                    }
                    res.status(200).json({
                        message: 'Facility ID updated successfully',
                    });
                });
            }
        });
    },

    updateFacilityName: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { id } = req.body;

        // Check if data for the user already exists in collectors table
        const selectQuery = `SELECT * FROM facilities WHERE user_id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error checking facility data:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            if (results && results.length > 0) {
                // Data already exists, perform UPDATE
                const updateQuery = `UPDATE facilities SET facility_name = ? WHERE user_id = ?`;
                db.query(updateQuery, [id, userId], (error) => {
                    if (error) {
                        console.error('Error updating facility name:', error);
                        return res.status(500).json({
                            error: 'An internal server error has occurred',
                        });
                    }
                    res.status(200).json({
                        message: 'Facility Name updated successfully',
                    });
                });
            }
        });
    },

    getAllCollectors: (req, res) => {   
        const getAllCollectorsQuery = `
        SELECT 
            facilities.id AS facility_id,
            facilities.user_id,
            facilities.facility_name,
            users.username,
            users.email,
            users.phone,
            users.role
        FROM facilities
        LEFT JOIN users ON facilities.user_id = users.id`;
        
        db.query(getAllCollectorsQuery, (error, results) => {
            if (error) {
                console.error('Error retrieving all facilities data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'No facilities data not found',
                })
            }
            const allCollectorsData = results.map(facility => ({
                facility_id: facility.id,
                user_id: facility.user_id,
                username: facility.username,
                email: facility.email,
                phone: facility.phone,
                user_role: facility.user_role,
                name: facility.name,
                facility_name: facility.facility_name,
            }));
            res.status(200).json(allCollectorsData);
        });
    },
}