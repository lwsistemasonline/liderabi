import { Request, Response } from "express";
import { createCompany, deleteCompany, findAllCompanies, findCompanyById, updateCompany } from "../repository/company.repository";
import { CompanySchema } from "../schema/company.schema";
import { StatusCodes } from 'http-status-codes';

export async function create(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const company = req.body as CompanySchema;
        const newCompany = await createCompany(company);
        return res.status(StatusCodes.CREATED).json(newCompany as CompanySchema);
    } catch (error: any) {
        console.error('Error creating company:', error);
        const errorMessage = error?.message || 'Error creating company';
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error: errorMessage,
            details: error?.meta || undefined
        });
    }
}

export async function getById(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const company = await findCompanyById(req.params.id);
        if (!company) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company not found' });
        }
        return res.status(StatusCodes.OK).json(company as CompanySchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error getting company by id' });
    }
};

export async function getAll(_req: Request, res: Response): Promise<Response | undefined> {
    try {
        const companies = await findAllCompanies();
        return res.status(StatusCodes.OK).json(companies as CompanySchema[]);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error getting all companies' });
    }
};

export async function update(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const company = await updateCompany(req.params.id, req.body as CompanySchema);
        if (!company) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company not found' });
        }
        return res.status(StatusCodes.OK).json(company as unknown as CompanySchema);    
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating company' });
    }
};

export async function softDelete(req: Request, res: Response): Promise<Response | undefined> {
    try {
        const company = await deleteCompany(req.params.id);
        if (!company) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company not found' });
        }
        return res.status(StatusCodes.OK).json(company as unknown as CompanySchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error deleting company' });
    }
};