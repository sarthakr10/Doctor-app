import express from 'express';
import { patientRegister } from '../controllers/userController.js';

const router = express.Router();

router.post("/patient/register", patientRegister);

export default router;