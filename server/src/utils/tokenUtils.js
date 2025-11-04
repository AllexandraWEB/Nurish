import jwt from 'jsonwebtoken';

export function generateAuthToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  const payload = {
    sub: user._id?.toString?.() || user.id,
    email: user.email,
    name: user.name || user.username || null
  };

  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: getCookieSecure(isProd),
    sameSite: getCookieSameSite(isProd),
    domain: getCookieDomain(),
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
  res.cookie('token', token, cookieOptions);
}

export function clearAuthCookie(res) {
  const isProd = process.env.NODE_ENV === 'production';
  const clearOptions = {
    httpOnly: true,
    secure: getCookieSecure(isProd),
    sameSite: getCookieSameSite(isProd),
    domain: getCookieDomain(),
    path: '/'
  };
  res.clearCookie('token', clearOptions);
}

function getCookieSecure(isProd) {
  if (typeof process.env.COOKIE_SECURE === 'string') {
    return process.env.COOKIE_SECURE === 'true';
  }
  return isProd; // secure in prod by default
}

function getCookieSameSite(isProd) {
  const v = (process.env.COOKIE_SAMESITE || '').toLowerCase();
  if (v === 'none' || v === 'lax' || v === 'strict') return v;
  // default to none in prod to allow cross-site cookies; lax in dev
  return isProd ? 'none' : 'lax';
}

function getCookieDomain() {
  // e.g. set COOKIE_DOMAIN=.yourdomain.com for cross-subdomain sharing
  // leave empty to let browser infer from response host
  return process.env.COOKIE_DOMAIN || undefined;
}
