import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../model/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, email, password } = req.body;

        const mailexisting = await User.findOne({ email });
        if (mailexisting) return res.status(409).json({ message: 'Email already exists' });

        const user = await User.create({ username, email, password });

        return res.status(201).json({
            message: 'Registered successfully',
            token: generateToken(user._id),
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        return res.status(200).json({
            message: 'Login successful',
            token: generateToken(user._id),
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const me = async (req, res) => { 
    return res.json({
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email
        }
    });
};