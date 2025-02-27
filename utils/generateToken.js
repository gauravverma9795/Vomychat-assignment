const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class TokenService {
  // Generate JWT for authentication
  generateAuthToken(userId) {
    const payload = {
      user: {
        id: userId
      }
    };

    return jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
  }

  // Generate password reset token
  generatePasswordResetToken() {
    return crypto.randomBytes(20).toString('hex');
  }

  // Verify JWT
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();