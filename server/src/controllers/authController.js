import { generateAuthToken } from '../utils/tokenUtils.js';
import * as authService from '../services/authService.js';

export const login = async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Body:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Validation failed');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log('✓ Validation passed, checking credentials...');
    const user = await authService.loginUser(email, password);
    
    if (!user) {
      console.log('❌ Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateAuthToken(user._id);

    console.log('✓ Login successful:', user.email);
    res.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const register = async (req, res) => {
  try {
    console.log('=== REGISTER REQUEST ===');
    console.log('Body:', req.body);
    
    const username = req.body.username || req.body.name;
    const { email, password } = req.body;

    if (!username || !email || !password) {
      console.log('❌ Validation failed');
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('✓ Validation passed, creating user...');
    const user = await authService.registerUser(username, email, password);
    const token = generateAuthToken(user._id);

    console.log('✓ User registered successfully:', user.email);
    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Register error:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


