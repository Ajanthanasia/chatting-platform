const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const users = {};
const channels = {};
const privateMesages = {};
const GroupMessages = {};

// Register user
router.post('/register', async (req, res) => {
  res.status(201).json({ message: 'User register unavailable' });
  // try {
  //   const { username, email, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const userId = `user_${Date.now()}`;
  //   users[userId] = { username, email, password: hashedPassword, channels: [] };
  //   res.status(201).json({ message: 'User saved', userId });
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to save user' });
  // }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user_${Date.now()}`;
    users[userId] = { username, password: hashedPassword, channels: [] };
    // const member = Object.values(users).find(user => user.username === username);
    // if (!member) {
    //   throw new Error('Invalid Username');
    // }
    // const isPasswordValid = await bcrypt.compare(password, member.password);
    // if (!isPasswordValid) {
    //   throw new Error('Invalid Password');
    // }

    // const userId = Object.keys(users).find(key => users[key] === member);
    res.status(200).json({
      message: 'Login successfully',
      username: username,
      userId,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Edit User Information
router.put('/editUser', (req, res) => {
  const { userId, newUsername } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    if (!users[userId]) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userId].username = newUsername || users[userId].username;

    res.status(200).json({
      message: 'User information updated successfully',
      "userId": userId,
      "username": newUsername
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user information' });
  }
});

// Get all users list
router.get('/users', (req, res) => {
  try {
    const usersList = Object.keys(users).map(userId => ({
      id: userId,
      username: users[userId].username,
      channels: users[userId].channels,
    }));
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create channel
router.post('/createchannel', async (req, res) => {
  try {
    const { userId, channelName } = req.body;

    if (!userId || !channelName) {
      return res.status(400).json({ error: 'userId and channelName are required' });
    }

    const member = users[userId];
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

    const channelId = `channel_${Date.now()}`;
    const lastMessage = Date.now();

    channels[channelId] = {
      ownerId: userId,
      channelName,
      lastMessage,
      members: [userId],
    };

    member.channels.push(channelName);

    res.status(201).json({
      message: `Channel ${channelName} created successfully by ${member.username}.`,
      ownerId: userId,
      channelName,
    });
  } catch (error) {
    console.error('Failed to create channel:', error);
    res.status(500).json({ error: 'Failed to create channel' });
  }
});

// Delete channel
router.post('/deletechannel', async (req, res) => {
  try {
    const { ownerId, channelName } = req.body;
    if (!ownerId || !channelName) {
      return res.status(400).json({ error: 'ownerId and channelName are required' });
    }

    const channelId = Object.keys(channels).find(
      key => channels[key].channelName === channelName
    );
    const channel = channels[channelId];

    if (channel && channel.ownerId === ownerId) {
      delete channels[channelId];
      users[ownerId].channels = users[ownerId].channels.filter(name => name !== channelName);
      res.status(200).json({ message: `Channel ${channelName} deleted by ${users[ownerId].username}.` });
    } else {
      res.status(404).json({ error: 'Channel not found or you are not the owner' });
    }
  } catch (error) {
    console.error('Failed to delete channel:', error);
    res.status(500).json({ error: 'Failed to delete channel' });
  }
});
// edit the channel
router.put('/editChannel', (req, res) => {
  const { userId, newChannel, channelId } = req.body;
  try {
    if (channels[channelId].ownerId == userId) {
      channels[channelId].channel = newChannel || channels[channelId].channel;

      res.status(200).json({
        message: 'channel information updated successfully',
        "ownerId": userId,
        "channelName": newChannel,
      });

    }
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to update channel information' });
  }

});

// Join channel
router.post('/joinchannel', async (req, res) => {
  try {
    const { userId, channelName } = req.body;

    if (!userId || !channelName) {
      return res.status(400).json({ error: 'userId and channelName are required' });
    }

    const member = users[userId];
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

    const channelId = Object.keys(channels).find(
      key => channels[key].channelName === channelName
    );
    const channel = channels[channelId];

    if (channel) {
      channel.members.push(userId);
      member.channels.push(channelName);
      res.status(200).json({ message: `${member.username} has joined the channel ${channelName}.` });
    } else {
      res.status(404).json({ error: 'Channel not found' });
    }
  } catch (error) {
    console.error('Failed to join channel:', error);
    res.status(500).json({ error: 'Failed to join channel' });
  }
});


// Leave channel
router.post('/leavechannel', async (req, res) => {
  try {
    const { userId, channelName } = req.body;

    if (!userId || !channelName) {
      return res.status(400).json({ error: 'userId and channelName are required' });
    }

    const member = users[userId];
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

    const channelId = Object.keys(channels).find(
      key => channels[key].channelName === channelName
    );
    const channel = channels[channelId];

    if (channel) {
      channel.members = channel.members.filter(id => id !== userId);
      member.channels = member.channels.filter(name => name !== channelName);
      res.status(200).json({ message: `${member.username} has left the channel ${channelName}.` });
    } else {
      res.status(404).json({ error: 'Channel not found' });
    }
  } catch (error) {
    console.error('Failed to leave channel:', error);
    res.status(500).json({ error: 'Failed to leave channel' });
  }
});

// Send message
router.post('/sendmessage', async (req, res) => {
  try {
    const { userId, channelName, message } = req.body;

    if (!userId || !channelName || !message) {
      return res.status(400).json({ error: 'userId, channelName, and message are required' });
    }

    const member = users[userId];
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

    const channelId = Object.keys(channels).find(
      key => channels[key].channelName === channelName
    );
    
    if (!channelId) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const groupMsgId = `msg_${Date.now()}`;
    const lastMessage = Date.now();

    const messageDetails = {
      msg: message,
      channelId: channelId,
      username: member.username,
      userId: userId,
      lastseen: lastMessage
    };

    if (!GroupMessages[channelId]) {
      GroupMessages[channelId] = [];
    }

    GroupMessages[channelId].push(messageDetails);

    res.status(200).json({
      message: `${member.username}: ${message}`,
      msg: message,
      group_msg_Id: groupMsgId,
      username: member.username,
      userId: userId,
      lastseen: lastMessage,
      messageHistory: GroupMessages[channelId]
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});


// get all channel list
router.get('/listChannels', (req, res) => {
  try {
    const channelList = Object.keys(channels).map(channelId => ({
      id: channelId,
      channels: channels[channelId].channelName,
      creatorId: channels[channelId].ownerId,
      ownerName: users[channels[channelId].ownerId].userId
    }));
    res.status(200).json(channelList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/privatemessage', async (req, res) => {
  try {
    const { userId, toUserID, message } = req.body;

    if (!userId || !toUserID || !message) {
      return res.status(400).json({ error: 'userId, toUserID, and message are required' });
    }

    const sender = users[userId];
    const receiver = users[toUserID];
    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }
    if (!receiver) {
      return res.status(404).json({ error: 'Receiver not found' });
    }

    const privateMsgId = `msg_${Date.now()}`;
    const lastMessage = Date.now();

    const messageDetails = {
      msg: message,
      toUserID: toUserID,
      userId: userId,
      lastseen: lastMessage
    };

    const userPairKey = `${userId}_${toUserID}`;
    const reverseUserPairKey = `${toUserID}_${userId}`;

    if (!privateMesages[userPairKey] && !privateMesages[reverseUserPairKey]) {
      privateMesages[userPairKey] = [];
    }

    if (privateMesages[userPairKey]) {
      privateMesages[userPairKey].push(messageDetails);
    } else if (privateMesages[reverseUserPairKey]) {
      privateMesages[reverseUserPairKey].push(messageDetails);
    }

    res.status(200).json({
      private_msg_Id: privateMsgId,
      msg: message,
      toUserID: toUserID,
      userId: userId,
      lastseen: lastMessage,
      messageHistory: privateMesages[userPairKey] || privateMesages[reverseUserPairKey]
    });

  } catch (error) {
    console.error('Failed to send private message:', error);
    res.status(500).json({ error: 'Failed to send private message' });
  }
});


// Send private message
// router.post('/privatemessage', async (req, res) => {
//   try {
//     const { userId, toUserID, message } = req.body;

//     if (!userId || !toUserID || !message) {
//       return res.status(400).json({ error: 'userId, toUserID, and message are required' });
//     }

//     const sender = users[userId];
//     const reciver=users[toUserID];
//     if (!sender) {
//       return res.status(404).json({ error: 'Sender not found' });
//     }

//     const private_msg_Id = `msg_${Date.now()}`;
//     const lastMessage = Date.now();

//     privateMesages[private_msg_Id] = {
//       "msg": message,
//       "toUserID": toUserID,
//       "userId": userId,
//       "lastseen": lastMessage
//     };
    
//     res.status(200).json({
//       "private_msg_Id": Object.keys(privateMesages).find(key => privateMesages[key].userId === userId),
//       "msg": message,
//       "toUserID": toUserID,
//       "userId": userId,
//       "lastseen": lastMessage
//     });


//   } catch (error) {
//     console.error('Failed to send private message:', error);
//     res.status(500).json({ error: 'Failed to send private message' });
//   }
// });

// autocompletetion
router.get('/search/:mess', async (req, res) => {
  const mess = req.params.mess.toLowerCase();
  const results = {
    users: [],
    channels: [],
    privateMessages: [],
    groupMessages: []
  };

  // Search in users
  for (const [userId, user] of Object.entries(users)) {
    if (user.username.toLowerCase().includes(mess)) {
      results.users.push({ userId, username: user.username });
    }
  }

  // Search in channels
  for (const [channelId, channel] of Object.entries(channels)) {
    if (channel.channelName.toLowerCase().includes(mess)) {
      results.channels.push({ channelId, channelName: channel.channelName });
    }
  }

  // Search in private messages
  for (const [msgId, privateMessage] of Object.entries(privateMesages)) {
    if (privateMessage.msg.toLowerCase().includes(mess)) {
      results.privateMessages.push({
        msgId,
        message: privateMessage.msg,
        toUserID: privateMessage.toUserID,
        userId: privateMessage.userId,
        lastseen: privateMessage.lastseen
      });
    }
  }

  // Search in group messages
  for (const [msgId, groupMessage] of Object.entries(GroupMessages)) {
    if (groupMessage.msg.toLowerCase().includes(mess)) {
      results.groupMessages.push({
        msgId,
        message: groupMessage.msg,
        channelId: groupMessage.channelId,
        username: groupMessage.username,
        userId: groupMessage.userId,
        lastseen: groupMessage.lastseen
      });
    }
  }

  res.status(200).json(results);

});
module.exports = router;