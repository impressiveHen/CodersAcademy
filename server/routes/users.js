const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const Joi = require('joi');

router.get('/current', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post('/signup', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists.");

    user = new User(_.pick(req.body, [
        'name',
        'password',
        'email'
    ]));


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, [
        '_id',
        'name',
        'email'
    ]));
});

router.post('/signin', async (req, res) => {
    const { error } = validateSignIn(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    /*
    A cookie with a secure flag will only be sent over an HTTPS connection.

    A cookie with the HttpOnly attribute is inaccessible to the JavaScript Document.cookie
    API; it is sent only to the server. This precaution helps mitigate cross-site scripting 
    (XSS) attacks.
    */
    res.cookie("jwt", token, {
        // secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 86400)
    });
    res.send();
});

function validateSignIn(body) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(body);
}

module.exports = router;