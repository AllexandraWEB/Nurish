import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateAuthToken } from '../utils/tokenUtils.js';

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error('Email already in use');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  const token = generateAuthToken(user);
  return { user: user.toSafeJSON(), token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const token = generateAuthToken(user);
  return { user: user.toSafeJSON(), token };
}


