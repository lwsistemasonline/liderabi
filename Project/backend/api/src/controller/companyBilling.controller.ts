import { Request, Response } from "express";
import { createCompanyBilling, deleteCompanyBilling, findAllCompanyBillings, findCompanyBillingById, updateCompanyBilling } from "../repository/companyBilling.repository";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const companyBilling = await createCompanyBilling(req.body);
        res.status(201).json(companyBilling);
    } catch (error) {
        logger.error(`Error creating company billing: ${error}`);
        res.status(500).json({ message: 'Error creating company billing' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const companyBilling = await findCompanyBillingById(req.params.id);
        res.status(200).json(companyBilling);
    } catch (error) {
        logger.error(`Error finding company billing by id: ${error}`);
        res.status(500).json({ message: 'Error finding company billing by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const companyBillings = await findAllCompanyBillings();
        res.status(200).json(companyBillings);
    } catch (error) {
        logger.error(`Error finding all company billings: ${error}`);
        res.status(500).json({ message: 'Error finding all company billings' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const companyBilling = await updateCompanyBilling(req.params.id, req.body);
        res.status(200).json(companyBilling);
    } catch (error) {
        logger.error(`Error updating company billing: ${error}`);
        res.status(500).json({ message: 'Error updating company billing' });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        await deleteCompanyBilling(req.params.id);
        res.status(200).json({ message: 'Company billing deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting company billing: ${error}`);
        res.status(500).json({ message: 'Error deleting company billing' });
    }
}

