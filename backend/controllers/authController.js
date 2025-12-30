const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Utility function to generate a JWT for a given user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register a new user (Public route)
exports.signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check whether a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create a new user entry with default values
    const user = await User.create({
      fullName,
      email,
      password,
      role: 'user', // assigning default role
      status: 'active'
    });

    // Issue JWT token for the newly registered user
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.status
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user and return auth token (Public route)
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation for input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Fetch user and include password field for verification
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Block login if the account is disabled
    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact administrator.'
      });
    }

    // Match user password with stored hash
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Track latest login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate auth token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.status,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Return details of the currently logged-in user (Private route)
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.status,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Logout endpoint — token removal is handled on client-side in JWT based auth
exports.logout = async (req, res, next) => {
  try {
    // Keeping this as a placeholder in case we introduce token blacklist / session tracking later
    res.status(200).json({
      success: true,
      message: 'Logout successful',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
