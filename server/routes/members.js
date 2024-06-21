const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const users = {}; 

router.post('/register', async (req, res) => {
  try {
    const { username ,email , password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const userId = `user_${Date.now()}`; // Generate a unique user ID
    users[userId] = { username,email, password: hashedPassword };
    res.status(201).json({ message: 'User saved', userId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

//login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const member = Object.values(users).find(user => user.username === username);

    if (!member) {
      throw new Error('Invalid Username');
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      throw new Error('Invalid Password');
    }
    res.status(200).send(`Welcome ${member.username}!`);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
