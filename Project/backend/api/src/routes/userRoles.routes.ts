import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/userRoles.controller";

const router = Router();

// Create a new user roles using /api/user-roles with POST
router.post('/', create);

// Find a user roles by id using /api/user-roles/:id with GET
router.get('/:id', findById);

// Find all user roles using /api/user-roles with GET
router.get('/', findAll);

// Update a user roles by id using /api/user-roles/:id with PUT
router.put('/:id', update);

// Delete a user roles by id using /api/user-roles/:id with DELETE
router.delete('/:id', softDelete);

export default router;




