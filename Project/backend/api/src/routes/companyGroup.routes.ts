import { Router } from 'express';
import { getAll, getById, create, update, softDelete } from '../controller/companyGroup.controller';

const router = Router();

// GET all company groups /api/company-groups
router.get('/', getAll);

// GET a company group by id /api/company-groups/:id
router.get('/:id', getById);

// CREATE a company group /api/company-groups
router.post('/', create);

// UPDATE a company group /api/company-groups/:id
router.put('/:id', update);

// DELETE a company group /api/company-groups/:id
router.delete('/:id', softDelete);

export default router;