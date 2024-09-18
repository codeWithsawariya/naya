import { Request, Response } from 'express';
import User from '../models/UserModels/admin.model';

// Register Admin
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = new User({
      username,
      email,
      password,
      role: 'admin'
    });

    await user.save();
    const token = user.generateToken();
    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Admin
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = user.generateToken();
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
