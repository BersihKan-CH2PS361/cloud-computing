// controllers/user-controller.js

const db = require('../lib/db.js');

module.exports = {
    getUserProfileById: (req, res) => {
        const  userId  = req.params.id;
    
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
            const userProfile = results[0];
            
            const sanitizedProfile = {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email,
                phone: userProfile.phone,
                role: userProfile.role,
                name: userProfile.name,
            };
            res.status(200).json(sanitizedProfile);
        });
    },

    updateUserProfile: (req, res) => {
        const userId = req.params.id;
        const { phone, name } = req.body;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const updateQuery = `UPDATE users SET phone = ?, name = ? WHERE id = ?`;

        db.query(updateQuery, [phone, name, userId], (error) => {
            if(error) {
                console.error('Error updating user profile:', error);
                return res.status(500).json({
                    error: 'An internal server error has occured',
                });
            }
            res.status(200).json({
                message: 'Profile updated successfully',
            });
        });
    }
}