// src/routes/appointment.routes.ts
// src/routes/appointment.routes.ts
import { Router } from 'express';
import {
    createAppointment,
    getAppointments,
    updateAppointment,
    cancelAppointment,
} from '../../controller/Appointment.controller';

const router = Router();

router.post('/create', createAppointment); // Create an appointment
router.get('/', getAppointments); // Get appointments
router.put('/:id', updateAppointment); // Update an appointment
router.delete('/:id', cancelAppointment); // Cancel an appointment

export default router;

