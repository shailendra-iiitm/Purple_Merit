const { validationResult } = require('express-validator');

// Middleware to collect and format validation errors from express-validator
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  // If any validation rule fails, return a structured error response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg
      }))
    });
  }
  
  // Continue to next middleware if no validation errors
  next();
};
