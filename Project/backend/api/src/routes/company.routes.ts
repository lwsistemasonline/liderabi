import { Router } from 'express';
import { create, getById, getAll, update, softDelete } from '../controller/company.controller';

const router = Router();

// Create a new company with /api/companies
router.post('/', create);

// Get a company by id with /api/companies/:id
router.get('/:id', getById);

// Get all companies with /api/companies
router.get('/', getAll);

// Update a company by id with /api/companies/:id
router.put('/:id', update);

// Soft delete a company by id with /api/companies/:id
router.delete('/:id', softDelete);

export default router;