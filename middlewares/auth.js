const jwt = require('jsonwebtoken');

exports.requiresignin = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization;
            const user = jwt.verify(token, 'secretkey');
            req.user = user;
        } catch {
            console.log('error');
        }
        next();
    }
    else {
        res.status(400).json({ message: 'Authorization required' });
    }
}