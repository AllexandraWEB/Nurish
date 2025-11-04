import { registerUser, loginUser } from '../services/authService.js';

export async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const result = await registerUser({ name, email, password });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json({ user: result.user });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Server error' });
  }
}

export async function handleLogin(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const result = await loginUser({ email, password });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({ user: result.user });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Server error' });
  }
}

export async function handleLogout(req, res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax'
  });
  return res.status(200).json({ message: 'Logged out' });
}


