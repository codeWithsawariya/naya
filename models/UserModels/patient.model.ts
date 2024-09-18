import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IPatient extends Document {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  email: string;
  password: string;
  medicalHistory: {
    condition: string;
    diagnosedDate: Date;
    notes: string;
  }[];
  allergies: string[];
  currentMedications: string[];
  insuranceInfo: {
    provider: string;
    policyNumber: string;
  };
  contactDetails: {
    emergencyContact: string;
    phone: string;
    address: string;
  };
  receiptNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medicalHistory: [
    {
      condition: { type: String, required: true },
      diagnosedDate: { type: Date, required: true },
      notes: { type: String },
    },
  ],
  allergies: [String],
  currentMedications: [String],
  insuranceInfo: {
    provider: { type: String },
    policyNumber: { type: String },
  },
  contactDetails: {
    emergencyContact: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  receiptNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving


const Patient = mongoose.model<IPatient>('Patient', patientSchema);

export default Patient;
