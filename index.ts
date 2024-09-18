import express from 'express';
import connectDB from './DB/db.config'; 
import UserRouter from './router/UserRoutes/admin.router';
import DoctorRouter from './router/UserRoutes/doctor.route';
import PatientRouter from './router/UserRoutes/patient.route';
import StaffRouter from './router/UserRoutes/medicalStaff.route';
import AppointmentRouter from './router/UserRoutes/Appointment.router'

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/admin', UserRouter);
app.use('/doctor', DoctorRouter);
app.use('/patient', PatientRouter);
app.use('/medicalStaff', StaffRouter);
app.use('/appointment', AppointmentRouter); // Make sure this matches the export

// Start Server and Connect to Database
app.listen(3000, async () => {
  console.log('Server started on port 3000');
  
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (err) {
    console.error(`Database connection failed: ${err}`);
  }
});
