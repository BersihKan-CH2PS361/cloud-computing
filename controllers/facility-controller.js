// controllers/facility-controller.js

const db = require('../lib/db.js');

module.exports = {

    updateFacilityName: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { facility_name } = req.body;

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
                db.query(updateQuery, [facility_name, userId], (error) => {
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

    searchFacilityById: (req, res) => {
        const facilityId = req.params.id;
    
        if (!facilityId) {
            return res.status(400).json({
                error: 'Bad request: Missing facility ID',
            });
        }
    
        const searchQuery = `SELECT * FROM facilities WHERE id = ?`;
    
        db.query(searchQuery, [facilityId], (error, results) => {
            if (error) {
                console.error('Error searching facility data by ID:', error);
                return res.status(500).json({
                    error: 'An internal server error occurred',
                });
            }
    
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Facility data not found',
                });
            }
    
            const facilityData = results[0]; 
    
            res.status(200).json({
                facility_id: facilityData.id,
                user_id: facilityData.user_id,
                facility_name: facilityData.facility_name,
            });
        });
    },

    searchFacilityByUserId: (req, res) => {
        const userId  = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing search ID',
            });
        }

        const selectQuery = `SELECT *, users.id AS user_id, facilities.id AS facility_id
        FROM users INNER JOIN facilities ON users.id = facilities.user_id WHERE users.id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user profile:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            const userData = results.map(user => ({
                facility_id: user.facility_id,
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                collector_name: user.name,
                facility_name: user.facility_name,
            }));
            res.status(200).json(userData);
        });
    }
}
