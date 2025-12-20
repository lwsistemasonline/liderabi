import { StatusCodes } from "http-status-codes";
import { CompanySubscriptionSchema } from "../schema/companySubscription.schema";
import { createCompanySubscription, deleteCompanySubscription, findAllCompanySubscriptions, findCompanySubscriptionByCompanyId, findCompanySubscriptionById, updateCompanySubscription } from "../repository/companySubscription.repository";
import { Request, Response } from "express";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const companySubscription = req.body as unknown as CompanySubscriptionSchema;
        const newCompanySubscription = await createCompanySubscription(companySubscription);
        return res.status(StatusCodes.CREATED).json(newCompanySubscription as unknown as CompanySubscriptionSchema);
    } catch (error: any) {
        logger.error(`Error creating company subscription: ${error}`);
        const errorMessage = error?.message || 'Error creating company subscription';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage, details: error?.meta || undefined });
    }
}

export async function getById(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const companySubscription = await findCompanySubscriptionById(req.params.id);
        if (!companySubscription) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company subscription not found' });
        }
        return res.status(StatusCodes.OK).json(companySubscription as unknown as CompanySubscriptionSchema);
    } catch (error: any) {
        logger.error(`Error getting company subscription by id: ${error}`);
        const errorMessage = error?.message || 'Error getting company subscription by id';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage, details: error?.meta || undefined });
    }
}

export async function getByCompanyId(req: Request, res: Response): Promise<Response | undefined> {
    try {
        console.log(`Getting company subscription by company id: ${req.params.companyId}`);
        const companySubscription = await findCompanySubscriptionByCompanyId(req.params.companyId);
        console.log(`Company subscription: ${companySubscription}`);
        if (!companySubscription) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company subscription not found' });
        }
        return res.status(StatusCodes.OK).json(companySubscription as unknown as CompanySubscriptionSchema);
    } catch (error: any) {
        logger.error(`Error getting company subscription by company id: ${error}`);
        const errorMessage = error?.message || 'Error getting company subscription by company id';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage, details: error?.meta || undefined });
    }
}

export async function getAll(_req: Request, res: Response): Promise<Response | undefined> {
    try {
        const companySubscriptions = await findAllCompanySubscriptions();
        return res.status(StatusCodes.OK).json(companySubscriptions as unknown as CompanySubscriptionSchema[]);
    } catch (error: any) {
        logger.error(`Error getting all company subscriptions: ${error}`);
        const errorMessage = error?.message || 'Error getting all company subscriptions';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage, details: error?.meta || undefined });
    }
}

export async function update(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const companySubscription = await updateCompanySubscription(req.params.id, req.body as unknown as CompanySubscriptionSchema);
        if (!companySubscription) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company subscription not found' });
        }
        return res.status(StatusCodes.OK).json(companySubscription as unknown as CompanySubscriptionSchema);
    } catch (error: any) {
        logger.error(`Error updating company subscription: ${error}`);
        const errorMessage = error?.message || 'Error updating company subscription';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage, details: error?.meta || undefined });
    }
}

export async function softDelete(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const companySubscription = await deleteCompanySubscription(req.params.id);
        if (!companySubscription) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company subscription not found' });
        }
        return res.status(StatusCodes.OK).json(companySubscription as unknown as CompanySubscriptionSchema);
    } catch (error: any) {
        logger.error(`Error deleting company subscription: ${error}`);
        const errorMessage = error?.message || 'Error deleting company subscription';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage, details: error?.meta || undefined });
    }
}