// middleware/auth-middleware.js

const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");

module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 4
        if (!req.body.username || req.body.username.length < 4) {
          return res.status(400).send({
            message: 'Please enter a username with a minimum of 4 characters.',
          });
        }
        // email validation
        if (!req.body.email || !isEmailValid(req.body.email)) {
          return res.status(400).send({
            message: 'Please enter a valid email address.',
          });
        }
        // password min 8 chars
        if (!req.body.password || req.body.password.length < 8) {
            return res.status(400).send({
                message: 'Please enter a password with a minimum of 8 characters.',
            });
        }
        // password (repeat) must match
        if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                message: 'Both passwords must match.',
            });
        }
        next();
    },

    isLoggedIn: (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(400).send({
          message: 'Your session is invalid or expired!',
        });
      }
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRETKEY');
        req.userData = decoded;
        next();
      } catch (err) {
        return res.status(400).send({
          message: 'Your session is invalid or expired!',
        });
      }
    },

    clearSession: (req, res, next) => {
      const userId = req.userData.userId;
    
      const updateQuery = 'UPDATE users SET last_logout = NOW() WHERE id = ?';
    
      new Promise((resolve, reject) => {
        db.query(updateQuery, [userId], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
        .then(() => {
          res.clearCookie('token');
          next();
        })
        .catch((err) => {
          console.error('Error updating last_logout:', err);
          res.status(500).json({
            error: 'An internal server error occurred',
          });
        });
    },
    
    userAuthorization: (requiredRole) => (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).send({
            message: 'Unauthorized. Please provide a valid token.',
          });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRETKEY');
        const userRole = decoded.role;
        if(userRole !== requiredRole) {
          return res.status(403).send({
            message: 'Forbidden. You do not have permission to access this resource.',
          });
        }
        req.userData = decoded;
        next();
      } catch(err) {
        return res.status(401).send({
          message: 'Unauthorized. Please provide a valid token.',
        });
      }
    }
};

function isEmailValid(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}