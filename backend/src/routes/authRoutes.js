import express from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',
    [
        body('username').notEmpty().withMessage('Username is '),
        body('email').isEmail().withMessage('Valid email is '),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    register
);

router.post('/login', 
    [
        body('email').isEmail().withMessage('Valid email is '),
        body('password').notEmpty().withMessage('Password is ')
    ],
    login
)

router.get('/me', protect, me);

export default router;