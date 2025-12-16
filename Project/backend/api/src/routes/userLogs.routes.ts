import { Router } from "express";
import { create, findById, searchAll, update, softDelete } from "../controller/userLogs.controller";

const router = Router();

// Create a new user logs using /api/user-logs with POST
router.post('/', create);

// Find a user logs by id using /api/user-logs/:id with GET
router.get('/:id', findById);

// Find all user logs using /api/user-logs with GET
router.post('/search/filter', searchAll);

// Update a user logs by id using /api/user-logs/:id with PUT
router.put('/:id', update);

// Delete a user logs by id using /api/user-logs/:id with DELETE
router.delete('/:id', softDelete);

export default router;




