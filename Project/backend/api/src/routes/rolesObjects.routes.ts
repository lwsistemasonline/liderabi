import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/rolesObjects.controller";

const router = Router();

// Create a new roles objects using /api/roles-objects with POST
router.post('/', create);

// Find a roles objects by id using /api/roles-objects/:id with GET
router.get('/:id', findById);

// Find all roles objects using /api/roles-objects with GET
router.get('/', findAll);

// Update a roles objects by id using /api/roles-objects/:id with PUT
router.put('/:id', update);

// Delete a roles objects by id using /api/roles-objects/:id with DELETE
router.delete('/:id', softDelete);

export default router;




