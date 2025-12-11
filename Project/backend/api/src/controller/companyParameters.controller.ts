import { Request, Response } from "express";
import { createCompanyParameters, findAllCompanyParameters, findCompanyParametersById, findCompanyParametersByCompanyId, softDeleteCompanyParameters, updateCompanyParameters } from "../repository/companyParameters.repository";
import { CompanyParametersSchema, CreateCompanyParametersData, UpdateCompanyParametersData } from "../schema/companyParameters.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const companyParameters = await createCompanyParameters(req.body as CreateCompanyParametersData);
        return res.status(StatusCodes.CREATED).json(companyParameters as CompanyParametersSchema);
    } catch (error) {
        logger.error(`Error creating company parameters: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating company parameters' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const companyParameters = await findCompanyParametersById(req.params.id);
        return res.status(StatusCodes.OK).json(companyParameters as CompanyParametersSchema);
    } catch (error) {
        logger.error(`Error finding company parameters by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding company parameters by id' });
    }
}

export async function findByCompanyId(req: Request, res: Response) {
    try {
        const companyParameters = await findCompanyParametersByCompanyId(req.params.companyId);
        if (!companyParameters) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Company parameters not found' });
        }
        return res.status(StatusCodes.OK).json(companyParameters as CompanyParametersSchema);
    } catch (error) {
        logger.error(`Error finding company parameters by company id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding company parameters by company id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const companyParameters = await findAllCompanyParameters();
        return res.status(StatusCodes.OK).json(companyParameters as CompanyParametersSchema[]);
    } catch (error) {
        logger.error(`Error finding all company parameters: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all company parameters' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const companyParameters = await updateCompanyParameters(req.params.id, req.body as UpdateCompanyParametersData);
        return res.status(StatusCodes.OK).json(companyParameters as CompanyParametersSchema);
    } catch (error) {
        logger.error(`Error updating company parameters: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating company parameters' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteCompanyParameters(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Company parameters deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting company parameters: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting company parameters' });
    }
}




