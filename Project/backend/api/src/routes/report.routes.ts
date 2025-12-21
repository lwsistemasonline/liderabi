import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/report.controller";

const router = Router();

// Create a new report using /api/reports with POST
router.post('/', create);

// Find all reports using /api/reports with GET
router.get('/', findAll);

// Find a report by id using /api/reports/:id with GET
router.get('/:id', findById);

// Update a report by id using /api/reports/:id with PUT
router.put('/:id', update);

// Delete a report by id using /api/reports/:id with DELETE
router.delete('/:id', softDelete);

export default router;

