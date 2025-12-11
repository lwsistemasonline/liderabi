import { Router } from 'express';
import { getAll, getById, create, update, softDelete } from '../controller/companyType.controller';

const router = Router();

// GET all company types /api/company-types
router.get('/', getAll);

// GET a company type by id /api/company-types/:id
router.get('/:id', getById);

// CREATE a company type /api/company-types
router.post('/', create);

// UPDATE a company type /api/company-types/:id
router.put('/:id', update);

// DELETE a company type /api/company-types/:id
router.delete('/:id', softDelete);

export default router;