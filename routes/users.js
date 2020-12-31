const express = require('express');
const router = express.Router();
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const User = require('../models/userModel');

// Verify JWT
router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
    return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
    return res.json(false);

    const user = await User.findById(verified.id);
    if (!user)
    return res.json(false);

    return res.json(true);
  }
  catch (err) {
    return res
      .status(500).json({ error: err.message });
  }
});

// Retrieve user data
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);

  res.json({
    id: user._id,
    name: user.name,
    email: user.email
  });
})

module.exports = router;
