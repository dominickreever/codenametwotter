const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// POST log in form
router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
        return  res.status(400)
                .json({ msg: "Not all fields have been entered."});

        const user = await User.findOne( { email: email });
        if (!user)
        return res.status(400)
                .json({ msg: "No account with this email registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        return res.status(400)
                .json( { msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json( {
            token,
            user: {
                id: user._id,
                name: user.name,
            }
        });
    }
    catch (err) {
        res.status(500)
            .json( { error: err.message });
    }
})

module.exports = router;