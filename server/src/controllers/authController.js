import { registerUser, loginUser } from '../services/authService.js';
import { setAuthCookie, clearAuthCookie } from '../utils/tokenUtils.js';

export async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const result = await registerUser({ name, email, password });
    setAuthCookie(res, result.token);
    // Also return token for environments where cross-site cookies are blocked
    return res.status(201).json({ user: result.user, token: result.token });
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
    setAuthCookie(res, result.token);
    return res.status(200).json({ user: result.user, token: result.token });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Server error' });
  }
}

export async function handleLogout(req, res) {
  clearAuthCookie(res);
  return res.status(200).json({ message: 'Logged out' });
}

export async function handleMe(req, res) {
  // req.user is injected by isAuth middleware
  return res.status(200).json({ user: req.user });
}


