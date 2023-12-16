// controllers/content-controller.js

const db = require('../lib/db.js');

module.exports = {
    createContent: (req, res) => {
        const { content_title, content_text } = req.body;
        const insertQuery = `INSERT INTO contents (content_title, content_text) VALUES (?, ?)`;
        db.query(insertQuery, [content_title, content_text], (error) => {
            if (error) {
                console.error('Error inserting order:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            res.status(201).json({
                message: 'Content added successfully',
            });
        });
    },

    getContent: (req, res) => {
        const getAllContentQuery = `SELECT * FROM contents`;
        
        db.query(getAllContentQuery, (error, results) => {
            if (error) {
                console.error('Error retrieving all contents data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Content data not found',
                })
            }
            const allContentData = results.map(content => ({
                id: content.id,
                content_title: content.content_title,
                content_text: content.content_text,
            }));
            res.status(200).json(allContentData);
        });
    },

    getContentById: (req, res) => {
        const contentId = req.params.id;

        if(!contentId){
            return res.status(400).json({
                error: 'Bad request: Missing content ID',
            });
        }

        const getAllContentQuery = `SELECT * FROM contents where id = ?`;
        
        db.query(getAllContentQuery, [contentId], (error, results) => {
            if (error) {
                console.error('Error retrieving all contents data:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Content data not found',
                })
            }
            const allContentData = results.map(content => ({
                id: content.id,
                content_title: content.content_title,
                content_text: content.content_text,
            }));
            res.status(200).json(allContentData);
        });
    },

    updateContentById: (req, res) => {
        const contentId = req.params.id

        if(!contentId){
            return res.status(400).json({
                error: 'Bad request: Missing content ID',
            });
        }
        
        const { content_title, content_text } = req.body;
        
        const updateQuery = `UPDATE contents SET content_title = ?, content_text = ? WHERE id = ?`;

        db.query(updateQuery, [content_title, content_text, contentId], (error) => {
            if(error) {
                console.error('Error updating content:', error);
                return res.status(500).json({
                    error: 'An internal server error has occured',
                });
            }
            res.status(200).json({
                message: 'Content updated successfully',
            });
        });
    },

    deleteContentById: (req, res) => {
        const contentId = req.params.id;

        if(!contentId){
            return res.status(400).json({
                error: 'Bad request: Missing content ID',
            });
        }

        const deleteQuery = `DELETE FROM contents WHERE id = ?`;

        db.query(deleteQuery, [contentId], (error, result) => {
            if (error) {
                console.error('Error deleting content:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Content not found or already deleted',
                });
            }
            res.status(200).json({
                message: 'Content deleted successfully',
            });
        });
    }
}