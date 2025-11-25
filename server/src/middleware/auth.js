import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
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
    console.log('Auth middleware - Decoded token:', decoded);
    
    // Handle both old tokens (with 'id') and new tokens (with 'userId')
    req.user = {
      userId: decoded.userId || decoded.id,
      email: decoded.email,
    };
    
    console.log('Auth middleware - User set on request:', req.user);
    next();
  } catch (err) {
    console.error('Auth middleware - Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;


