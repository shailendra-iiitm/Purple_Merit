// Centralized error handling middleware for the entire app
exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error in console to help during debugging
  console.error('Error:', err);

  // Handle invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error.message = message;
    error.statusCode = 404;
  }

  // Handle duplicate key errors (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message =
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error.message = message;
    error.statusCode = 400;
  }

  // Handle validation errors from Mongoose schema rules
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error.message = message;
    error.statusCode = 400;
  }

  // Handle invalid JWT
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token. Please login again.';
    error.statusCode = 401;
  }

  // Handle expired JWT
  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired. Please login again.';
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Fallback handler for unknown / missing routes
exports.notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};
