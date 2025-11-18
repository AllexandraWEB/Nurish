import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  console.log('Auth middleware - Authorization header:', authHeader ? 'Present' : 'Missing');
  console.log('Auth middleware - Token extracted:', token ? 'Yes' : 'No');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Auth middleware - User decoded:', decoded.id);
    next();
  } catch (err) {
    console.error('Auth middleware - Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
}


