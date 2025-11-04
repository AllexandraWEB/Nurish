import jwt from 'jsonwebtoken';

export function isAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const [scheme, bearerToken] = header.split(' ');
  const cookieToken = req.cookies?.token;
  const token = scheme === 'Bearer' && bearerToken ? bearerToken : cookieToken;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT secret missing');
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// Backward-compatible export
export const authMiddleware = isAuth;


