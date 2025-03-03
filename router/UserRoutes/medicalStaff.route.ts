import { Router } from 'express';
import { register, login } from '../../controller/medicalStaff.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
