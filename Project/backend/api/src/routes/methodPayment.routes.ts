import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/methodPaymend.controller";

const router = Router();

// Create a new method payment using /api/method-payments with /api/method-payments POST
router.post('/', create);

// Find a method payment by id using /api/method-payments/:id with /api/method-payments/:id GET
router.get('/:id', findById);

// Find all method payments using /api/method-payments with /api/method-payments GET
router.get('/', findAll);

// Update a method payment by id using /api/method-payments/:id with /api/method-payments/:id PUT
router.put('/:id', update);

// Delete a method payment by id using /api/method-payments/:id with /api/method-payments/:id DELETE
router.delete('/:id', softDelete);

export default router;