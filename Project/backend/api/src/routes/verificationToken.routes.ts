import { Router } from "express";
import { create, findById, findByToken, findAll, update, remove } from "../controller/verificationToken.controller";

const router = Router();

// Create a new verification token using /api/verification-tokens with POST
router.post('/', create);

// Find all verification tokens using /api/verification-tokens with GET
router.get('/', findAll);

// Find a verification token by token using /api/verification-tokens/token/:token with GET
router.get('/token/:token', findByToken);

// Find a verification token by id using /api/verification-tokens/:id with GET
router.get('/:id', findById);

// Update a verification token by id using /api/verification-tokens/:id with PUT
router.put('/:id', update);

// Delete a verification token by id using /api/verification-tokens/:id with DELETE
router.delete('/:id', remove);

export default router;

