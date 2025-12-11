import { Router } from 'express';
import { getAll, get, create, update, softDelete } from '../controller/userSubscriptions.controller';

const router = Router();

// GET /api/user-subscriptions - Get all user subscriptions
router.get('/', getAll);

// GET /api/user-subscriptions/:id - Get user subscription by ID
router.get('/:id', get);

// POST /api/user-subscriptions - Create a new user subscription
router.post('/', create);

// PUT /api/user-subscriptions/:id - Update a user subscription
router.put('/:id', update);

// DELETE /api/user-subscriptions/:id - Soft delete a user subscription
router.delete('/:id', softDelete);

export default router;