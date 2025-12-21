import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/reportWorkspace.controller";

const router = Router();

// Create a new report workspace using /api/report-workspaces with POST
router.post('/', create);

// Find all report workspaces using /api/report-workspaces with GET
router.get('/', findAll);

// Find a report workspace by id using /api/report-workspaces/:id with GET
router.get('/:id', findById);

// Update a report workspace by id using /api/report-workspaces/:id with PUT
router.put('/:id', update);

// Delete a report workspace by id using /api/report-workspaces/:id with DELETE
router.delete('/:id', softDelete);

export default router;

