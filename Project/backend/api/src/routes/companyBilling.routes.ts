import { Router } from "express";
import { create, findById, findAll, update, remove } from "../controller/companyBilling.controller";

const router = Router();

// Create a new company billing using /api/company-billings
router.post('/', create);

// Find a company billing by id using /api/company-billings/:id
router.get('/:id', findById);

// Find all company billings using /api/company-billings
router.get('/', findAll);

// Update a company billing by id using /api/company-billings/:id
router.put('/:id', update);

// Delete a company billing by id using /api/company-billings/:id
router.delete('/:id', remove);

export default router;