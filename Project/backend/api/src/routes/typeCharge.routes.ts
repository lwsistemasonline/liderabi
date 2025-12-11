import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/typeCharge.controller";

const router = Router();

// Create a new type charge using /api/type-charges with /api/type-charges POST
router.post('/', create);

// Find a type charge by id using /api/type-charges/:id with /api/type-charges/:id GET
router.get('/:id', findById);

// Find all type charges using /api/type-charges with /api/type-charges GET
router.get('/', findAll);

// Update a type charge by id using /api/type-charges/:id with /api/type-charges/:id PUT
router.put('/:id', update);

// Delete a type charge by id using /api/type-charges/:id with /api/type-charges/:id DELETE
router.delete('/:id', softDelete);

export default router;
