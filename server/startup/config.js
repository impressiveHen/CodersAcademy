require('dotenv').config();

module.exports = function() {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('FATAL ERROR: jwt secret key is not defined.');
    }
} 