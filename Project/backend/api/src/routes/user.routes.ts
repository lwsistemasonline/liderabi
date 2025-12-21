import { Router } from 'express';
import { getAll, get, create, update, softDelete } from '../controller/user.controller';

const router = Router();

// GET /api/users - Get all users
router.post('/search', getAll);

// GET /api/users/:id - Get user by ID
router.get('/:id', get);

// POST /api/users - Create a new user
router.post('/', create);

// PUT /api/users/:id - Update a user
router.put('/:id', update);

// DELETE /api/users/:id - Soft delete a user
router.delete('/:id', softDelete);

export default router;

