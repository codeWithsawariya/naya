import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor, { IDoctor } from '../models/UserModels/doctor.model';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';
const tokenExpiry = '1h';

// Register Doctor
export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      lastName,
      dateOfBirth,
      gender,
      country,
      city,
      address,
      pincode,
      contactInformation,
      email,
      specialization,
      department,
      professionalInformation,
      workSchedule,
      username,
      password,
      documentation,
      emergencyContact,
      profileStatus,
      additionalInformation,
    } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const doctor = new Doctor({
      fullName,
      lastName,
      dateOfBirth,
      gender,
      country,
      city,
      address,
      pincode,
      contactInformation,
      email,
      specialization,
      department,
      professionalInformation,
      workSchedule,
      authentication: {
        username,
        password: hashedPassword,
        role: 'Doctor',
      },
      documentation,
      emergencyContact,
      profileStatus,
      additionalInformation,
    });

    await doctor.save();

    const token = jwt.sign({ id: doctor._id, role: doctor.authentication.role }, secret, {
      expiresIn: tokenExpiry,
    });

    res.status(201).json({ message: 'Doctor registered successfully', token });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Sign In Doctor
export const signInDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ error: 'Doctor not found' });

    const isMatch = await bcrypt.compare(password, doctor.authentication.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id, role: doctor.authentication.role }, secret, {
      expiresIn: tokenExpiry,
    });

    res.json({ message: 'Signed in successfully', token });
  } catch (error) {
    console.error('Error signing in doctor:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
