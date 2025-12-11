import { Router } from "express";
import { create, findById, findByCode, findAll, update, softDelete } from "../controller/objects.controller";

const router = Router();

// Create a new objects using /api/objects with POST
router.post('/', create);

// Find all objects using /api/objects with GET
router.get('/', findAll);

// Find an objects by code using /api/objects/code/:code with GET
router.get('/code/:code', findByCode);

// Find an objects by id using /api/objects/:id with GET
router.get('/:id', findById);

// Update an objects by id using /api/objects/:id with PUT
router.put('/:id', update);

// Delete an objects by id using /api/objects/:id with DELETE
router.delete('/:id', softDelete);

export default router;

