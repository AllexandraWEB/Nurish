import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const registerUser = async (username, email, password) => {
  try {
    console.log('Checking if user exists:', email);
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    console.log('Hashing password...');
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Creating new user...');
    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      favorites: [],
    });

    await user.save();
    console.log('User saved successfully:', user.email);

    return user;
  } catch (error) {
    console.error('Register service error:', error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Login service called with:', { email, password: password ? 'PROVIDED' : 'MISSING' });
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found');
      return null;
    }

    console.log('User found:', user.email);
    console.log('Stored password hash exists:', !!user.password);
    console.log('Provided password exists:', !!password);
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('Password does not match');
      return null;
    }

    console.log('Password matches, login successful');
    return user;
  } catch (error) {
    console.error('Login service error:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    console.error('Get user error:', error.message);
    throw error;
  }
};


