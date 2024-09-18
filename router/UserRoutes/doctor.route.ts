import { Router } from 'express';
import { registerDoctor, signInDoctor } from '../../controller/doctor.controller';

const router = Router();

// Register Doctor
router.post('/register', registerDoctor);

// Sign In Doctor
router.post('/signin', signInDoctor);

export default router;
