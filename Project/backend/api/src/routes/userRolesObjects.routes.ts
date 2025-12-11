import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/userRolesObjects.controller";

const router = Router();

// Create a new user roles objects using /api/user-roles-objects with POST
router.post('/', create);

// Find a user roles objects by id using /api/user-roles-objects/:id with GET
router.get('/:id', findById);

// Find all user roles objects using /api/user-roles-objects with GET
router.get('/', findAll);

// Update a user roles objects by id using /api/user-roles-objects/:id with PUT
router.put('/:id', update);

// Delete a user roles objects by id using /api/user-roles-objects/:id with DELETE
router.delete('/:id', softDelete);

export default router;




