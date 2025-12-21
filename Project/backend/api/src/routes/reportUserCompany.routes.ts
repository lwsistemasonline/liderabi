import { Router } from "express";
import { create, findById, findAll, update, softDelete } from "../controller/reportUserCompany.controller";

const router = Router();

// Create a new report user company using /api/report-user-companies with POST
router.post('/', create);

// Find all report user companies using /api/report-user-companies with GET
router.get('/', findAll);

// Find a report user company by id using /api/report-user-companies/:id with GET
router.get('/:id', findById);

// Update a report user company by id using /api/report-user-companies/:id with PUT
router.put('/:id', update);

// Delete a report user company by id using /api/report-user-companies/:id with DELETE
router.delete('/:id', softDelete);

export default router;

