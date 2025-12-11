import { Router } from 'express';
import { getAll, getById, create, update, softDelete } from '../controller/level.controller';

const router = Router();

// GET all levels /api/levels
router.get('/', getAll);

// GET a level by id /api/levels/:id
router.get('/:id', getById);

// CREATE a level /api/levels
router.post('/', create);

// UPDATE a level /api/levels/:id
router.put('/:id', update);

// DELETE a level /api/levels/:id
router.delete('/:id', softDelete);

export default router;