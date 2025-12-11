import { Router } from "express";
import { create, getAll, getById, softDelete, update } from "../controller/companySubscription.controller";

const router = Router();

// Create a new company subscription /api/company-subscriptions
router.post('/', create);

// Get all company subscriptions /api/company-subscriptions
router.get('/', getAll);

// Get a company subscription by id /api/company-subscriptions/:id
router.get('/:id', getById);

// Update a company subscription by id /api/company-subscriptions/:i
router.put('/:id', update);

// Soft delete a company subscription by id /api/company-subscriptions/:id
router.delete('/:id', softDelete);

export default router;