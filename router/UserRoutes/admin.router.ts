import express from 'express';
import { body } from 'express-validator';
import { registerAdmin, loginAdmin } from '../../controller/admin.controller'; // Adjust path if necessary

const router = express.Router();

// Validation middleware
const signupValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const signinValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

export default router;