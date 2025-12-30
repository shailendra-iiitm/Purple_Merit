const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validate');
const {
  getAllUsers,
  activateUser,
  deactivateUser,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules for updating profile details
const updateProfileValidation = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
];

// Validation rules for changing password
const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'New password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your new password')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// ============================================
// USER ROUTES (profile & account settings)
// ============================================
router.get('/profile', protect, getProfile);
router.put(
  '/profile',
  protect,
  updateProfileValidation,
  handleValidationErrors,
  updateProfile
);
router.put(
  '/change-password',
  protect,
  changePasswordValidation,
  handleValidationErrors,
  changePassword
);

// ============================================
// ADMIN ROUTES (user management)
// ============================================
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/:id/activate', protect, authorize('admin'), activateUser);
router.put('/:id/deactivate', protect, authorize('admin'), deactivateUser);

module.exports = router;
