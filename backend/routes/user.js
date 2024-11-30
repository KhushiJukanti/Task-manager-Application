const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.Google_Id);


router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.status(400).send({ message: "Passwords do not match", success: false });
  }
  try {
    let UserExist = await User.findOne({ email: email });
    if (UserExist) {
      return res.status(400).send({ message: "User Already Exists", success: false });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ firstname, lastname, email, password: hashedPassword });
    
    await user.save();
    res.status(201).send({ message: 'User registered successfully', success: true });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).send({ message: 'user login successful', token: token, email: email, user_id: user._id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//  google route
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: client,
    });
    const payload = ticket.getPayload();
    const { sub, email, given_name, family_name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        firstname: given_name,
        lastname: family_name,
        email,
        password: bcrypt.hashSync(sub, 8)
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

    res.status(200).send({ message: 'Google login successful', token: jwtToken, email: email, user_id: user._id });
  } catch (error) {
    res.status(500).send({ message: 'Google login failed', error: error.message });
  }
});

module.exports = router;
