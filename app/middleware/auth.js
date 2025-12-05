// app/middleware/auth.js
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'devfallbacksecret';

module.exports = function (req, res, next) {
  // Get the header (Postman: "Authorization" = "Bearer <token>")
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  // Trim spaces and split on ANY whitespace (space, tab, etc.)
  const parts = header.trim().split(/\s+/);

  // parts[0] should be "Bearer" (case-insensitive), parts[1] is the token
  if (parts.length < 2 || !/^Bearer$/i.test(parts[0])) {
    return res.status(401).json({ message: 'Invalid auth header format.' });
  }

  const token = parts.slice(1).join(' '); // join again in case of extra spaces

  jwt.verify(token, jwtSecret, (err, userPayload) => {
    if (err) {
      console.error('JWT verify error:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // { userId, email, iat, exp }
    req.user = userPayload;
    next(); // go to the real route (e.g., create project)
  });
};
``
