const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const users = {}; 
const channels = {};

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
    console.log(member)
    // res.status(200).send(`Welcome ${member.username}!`);
    res.status(201).json({ message: 'Loggin succesfully',
       "username":member.username,
       "userId": Object.keys(users).find(key => users[key] === member),
       "email": member.email });
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

router.get('/users', (req, res) => {
  try {
    const usersList = Object.keys(users).map((userId) => ({
      id: userId,
      username: users[userId].username,
      channels: users[userId].channels,
    }));
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// create the channel details
router.post('/createchannel', async (req, res) => {
  try {
    const { userId, channelName } = req.body;

    if (!userId || !channelName) {
      return res.status(400).json({ error: 'userId and channelName are required' });
    }
    const member = users[userId];
    console.log(users,"--------")

    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }
    const channelId = `channel_${Date.now()}`; 
    const lastMessage = Date.now();

    channels[channelId] = {
      userId,
      channelName,
      lastMessage
    };

    res.status(201).json({ message: `Channel ${channelName} created successfully by ${member.username}.` });
  } catch (error) {
    console.error('Failed to create channel:', error);
    res.status(500).json({ error: 'Failed to create channel' });
  }
});
module.exports = router;
