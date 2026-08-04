const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Helper token generator
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'missionx_super_secret_jwt_key_2026_odd_sem',
    { expiresIn: '30d' }
  );
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    user = await User.create({
      name,
      email,
      password,
      role: role || 'STUDENT',
      avatar: avatar || 'cyber_agent_1',
    });

    const token = generateToken(user);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        stats: user.stats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          stats: user.stats,
        },
      });
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/auth/me
router.get('/me', async (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'demo_user_1',
      name: 'Agent Maverick',
      email: 'maverick@missionx.edu',
      role: 'GAME_MASTER',
      avatar: 'cyber_agent_pro',
      stats: {
        xp: 3450,
        coins: 820,
        missionsCompleted: 14,
        criticalThinkingScore: 88,
        analyticalScore: 92,
        decisionScore: 84,
        leadershipScore: 90,
        communicationScore: 86,
      },
    },
  });
});

module.exports = router;
