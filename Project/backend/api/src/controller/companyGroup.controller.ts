import { Request, Response } from 'express';
import { findAllCompanyGroup, findCompanyGroupById, createCompanyGroup, updateCompanyGroup, softDeleteCompanyGroup } from '../repository/companyGroup.repository';
import { CompanyGroupSchema } from '../schema/companyGroup.schema';
import { StatusCodes } from 'http-status-codes';

export async function getAll(_req: Request, res: Response) {
    try {
        const companyGroups = await findAllCompanyGroup();
        return res.status(StatusCodes.OK).json(companyGroups as CompanyGroupSchema[]);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get company groups' });
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const companyGroup = await findCompanyGroupById(req.params.id);
        return res.status(StatusCodes.OK).json(companyGroup as CompanyGroupSchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get company group' });
    }
}

export async function create(req: Request, res: Response) {
    try {
        const companyGroup = await createCompanyGroup(req.body as CompanyGroupSchema);
        return res.status(StatusCodes.CREATED).json(companyGroup as CompanyGroupSchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create company group' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const companyGroup = await updateCompanyGroup(req.params.id, req.body as CompanyGroupSchema);
        return res.status(StatusCodes.OK).json(companyGroup as CompanyGroupSchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update company group' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteCompanyGroup(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Company group deleted successfully' });  
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete company group' });
    }
}