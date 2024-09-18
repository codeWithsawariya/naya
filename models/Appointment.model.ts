// src/models/Appointment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  patientId: string;
  doctorId: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  notes?: string;
}

const AppointmentSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  notes: { type: String },
});

const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
export default Appointment;
