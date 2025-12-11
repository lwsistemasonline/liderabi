import { Router } from 'express';
import { authenticate, logout } from '../controller/auth.controller';

const router = Router();

// POST /api/auth - Authenticate user subscription with email and password
router.post('/', authenticate);

// POST /api/auth/logout - Logout user and invalidate session
router.post('/logout', logout);

export default router;

