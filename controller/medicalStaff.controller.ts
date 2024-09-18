import { Request, Response } from 'express';
import MedicalStaff from '../models/UserModels/medicalStaff.moduel';

// Register Medical Staff
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role, department } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await MedicalStaff.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new user instance
    const user = new MedicalStaff({
      username,
      email,
      password, // Password will be hashed by the schema's setter
      role,
      department,
    });

    // Save the new user to the database
    await user.save();

    // Generate JWT token
    const token = user.generateToken();
    
    // Respond with success message and token
    res.status(201).json({ message: 'Medical staff registered successfully', token });
  } catch (error) {
    console.error('Error registering medical staff:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Medical Staff
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await MedicalStaff.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the password is correct
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = user.generateToken();
    
    // Respond with success message and token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in medical staff:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
