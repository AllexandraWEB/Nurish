import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error('Email already in use');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  const token = createJwtForUser(user);
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
  const token = createJwtForUser(user);
  return { user: user.toSafeJSON(), token };
}

function createJwtForUser(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  const payload = { sub: user._id.toString(), email: user.email };
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}


