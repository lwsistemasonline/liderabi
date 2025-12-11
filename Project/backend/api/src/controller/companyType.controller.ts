import { Request, Response } from 'express';
import { findAllTypeCompany, findTypeCompanyById, createTypeCompany, updateTypeCompany, softDeleteTypeCompany } from '../repository/companyType.repository';
import { TypeCompanySchema } from '../schema/companyType.schema';
import { StatusCodes } from 'http-status-codes';

export async function getAll(_req: Request, res: Response) {
    try {
        const typeCompanies = await findAllTypeCompany();
        return res.status(StatusCodes.OK).json(typeCompanies as TypeCompanySchema[]);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get type companies' });
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const typeCompany = await findTypeCompanyById(req.params.id);
        return res.status(StatusCodes.OK).json(typeCompany as TypeCompanySchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get type company' });
    }
}

export async function create(req: Request, res: Response) { 
    try {
        const typeCompany = await createTypeCompany(req.body as TypeCompanySchema);
        return res.status(StatusCodes.CREATED).json(typeCompany as TypeCompanySchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create type company' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const typeCompany = await updateTypeCompany(req.params.id, req.body as TypeCompanySchema);
        return res.status(StatusCodes.OK).json(typeCompany as TypeCompanySchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update type company' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteTypeCompany(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Type company deleted successfully' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete type company' });
    }
}