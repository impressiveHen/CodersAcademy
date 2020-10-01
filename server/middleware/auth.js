const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch(err) {
        console.log(err);
        res.status(400).send('Invalid token.');
    }
};