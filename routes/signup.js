const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// POST sign up form
router.post('/', async (req, res, next) => {
    try {
    const { name, email, password } = req.body;

    // Validate POST data
    if (!name || !email || !password) 
    return res.status(400)
            .json( { msg: "Not all fields have been entered."} );

    if (password.length < 8)
    return res.status(400)
            .json( { msg: "Password needs to be at least 8 characters long." } );
    
    const existingEmail = await User.findOne( {email: email });
    if (existingEmail)
    return res.status(400)
            .json( { msg: "An account with this email already exists." });

    const existingName = await User.findOne( {name: name });
    if (existingName)
    return res.status(400)
                    .json( { msg: "An account with this name already exists." });

    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create and save new User
    const newUser = new User({
        name,
        email,
        password: passwordHash
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
    }
    catch (err) {
        res.status(500)
            .json( {error: err.message} );
    }
})

module.exports = router;