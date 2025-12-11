import { Router } from "express";
import { create, findById, findByCompanyId, findAll, update, softDelete } from "../controller/companyParameters.controller";

const router = Router();

// Create a new company parameters using /api/company-parameters with POST
router.post('/', create);

// Find all company parameters using /api/company-parameters with GET
router.get('/', findAll);

// Find a company parameters by company id using /api/company-parameters/company/:companyId with GET
router.get('/company/:companyId', findByCompanyId);

// Find a company parameters by id using /api/company-parameters/:id with GET
router.get('/:id', findById);

// Update a company parameters by id using /api/company-parameters/:id with PUT
router.put('/:id', update);

// Delete a company parameters by id using /api/company-parameters/:id with DELETE
router.delete('/:id', softDelete);

export default router;

