import mongoose, { Document, Schema } from 'mongoose';

// Define the Doctor interface extending Document
export interface IDoctor extends Document {
  fullName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  country: string;
  city: string;
  address: string;
  pincode: string;
  contactInformation: string;
  email: string;
  specialization: string;
  department: string;
  professionalInformation: string;
  workSchedule: string;
  authentication: {
    username: string;
    password: string;
    role: string;
  };
  documentation: string;
  emergencyContact: {
    name: string;
    number: string;
  };
  profileStatus: string;
  additionalInformation?: string;
}

// Define the Schema for Doctor
const DoctorSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  contactInformation: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  department: { type: String, required: true },
  professionalInformation: { type: String, required: true },
  workSchedule: { type: String, required: true },
  authentication: {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  documentation: { type: String, required: true },
  emergencyContact: {
    name: { type: String, required: true },
    number: { type: String, required: true },
  },
  profileStatus: { type: String, required: true },
  additionalInformation: { type: String },
});

// Create the Doctor model
const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
