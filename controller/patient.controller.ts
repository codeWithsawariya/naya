import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/UserModels/patient.model';

const JWT_SECRET = 'your_jwt_secret_key';

// Function to generate an 8-digit receipt number
const generateReceiptNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export const register = async (req: Request, res: Response) => {
  console.log("patient working");
  
  const { firstName, lastName, dob, gender, email, password, medicalHistory, allergies, currentMedications, insuranceInfo, contactDetails } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if the email is already in use
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Generate a new receipt number
    const receiptNumber = generateReceiptNumber();

    // Create a new patient
    const patient = new Patient({
      firstName,
      lastName,
      dob,
      gender,
      email,
      password:hashedPassword,
      medicalHistory,
      allergies,
      currentMedications,
      insuranceInfo,
      contactDetails,
      receiptNumber,
    });

    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully', receiptNumber });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Error registering patient' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: patient._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({message:'Signin successfully' ,token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
