import { Router } from "express";
import { create, findById, findByName, findAll, update, softDelete } from "../controller/roles.controller";

const router = Router();

// Create a new roles using /api/roles with POST
router.post('/', create);

// Find all roles using /api/roles with GET
router.get('/', findAll);

// Find a roles by name using /api/roles/name/:name with GET
router.get('/name/:name', findByName);

// Find a roles by id using /api/roles/:id with GET
router.get('/:id', findById);

// Update a roles by id using /api/roles/:id with PUT
router.put('/:id', update);

// Delete a roles by id using /api/roles/:id with DELETE
router.delete('/:id', softDelete);

export default router;

