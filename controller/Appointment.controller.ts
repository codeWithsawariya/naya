// src/controllers/appointment.controller.ts
import { Request, Response } from 'express';
import Appointment from '../models/Appointment.model'

export const createAppointment = async (req: Request, res: Response) => {

    console.log("create appoinment working ");
    
  const { patientId, doctorId, appointmentDate, startTime, endTime, notes } = req.body;

  try {
    // Check for overlapping appointments
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      $or: [
        { $and: [{ startTime: { $lte: endTime } }, { endTime: { $gte: startTime } }] },
        { $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] },
      ],
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Doctor is already booked during this time.' });
    }

    const appointment = new Appointment({ patientId, doctorId, appointmentDate, startTime, endTime, notes });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error creating appointment' });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
    console.log("get appointment working");
    
  const { doctorId, patientId } = req.query;

  try {
    const filter: any = {};
    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;

    const appointments = await Appointment.find(filter);
    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    res.json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Error updating appointment' });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    res.json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ error: 'Error canceling appointment' });
  }
};
