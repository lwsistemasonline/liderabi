import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/typeObject.controller";

const router = Router();

// Create a new type object using /api/type-objects with POST
router.post('/', create);

// Find a type object by id using /api/type-objects/:id with GET
router.get('/:id', findById);

// Find all type objects using /api/type-objects with GET
router.get('/', findAll);

// Update a type object by id using /api/type-objects/:id with PUT
router.put('/:id', update);

// Delete a type object by id using /api/type-objects/:id with DELETE
router.delete('/:id', softDelete);

export default router;




