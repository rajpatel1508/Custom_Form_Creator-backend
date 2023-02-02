const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
    });

    try {
        const result = await user.save();
        const token = jwt.sign({ id: result._id }, 'secretkey', {
            expiresIn: '1h'
        });
        res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'User registration failed' });
    }
}

exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
        return res.status(400).send({ message: 'User not found' });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.status(400).send({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, 'secretkey', {
        expiresIn: '1h'
    });
    res.status(200).json({ message: 'User logged in successfully', token });
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully'
    })
}