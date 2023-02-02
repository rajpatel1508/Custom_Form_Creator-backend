const jwt = require('jsonwebtoken');

exports.requiresignin = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization;
            const user = jwt.verify(token, 'secretkey');
            req.user = user;
        } catch {
            // res.redirect('/api/logout');
            console.log('error');
        }
    }
    else {
        res.status(400).json({ message: 'Authorization required' });
    }
    next();
}