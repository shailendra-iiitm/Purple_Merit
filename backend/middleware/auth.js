const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes by validating JWT
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Look for token in Authorization header (Bearer <token>)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token is found, block access
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
    }

    try {
      // Decode and verify token using the secret key
      console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Secret exists' : 'Secret missing');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user linked to the token and attach to request object
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }

      // Block access if the account is disabled
      if (user.status === 'inactive') {
        return res.status(403).json({
          success: false,
          message: 'Your account has been deactivated. Please contact admin.'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Allow access only for specific user roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log('Authorize middleware check:', {
      requiredRoles: roles,
      userRole: req.user?.role,
      userId: req.user?._id,
      userEmail: req.user?.email
    });
    
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated or role missing'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

// Middleware to ensure user account is active (additional safety check)
exports.checkActive = (req, res, next) => {
  if (req.user.status !== 'active') {
    return res.status(403).json({
      success: false,
      message: 'Your account is inactive. Please contact administrator.'
    });
  }
  next();
};
