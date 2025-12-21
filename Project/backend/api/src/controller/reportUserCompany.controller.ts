import { Request, Response } from "express";
import { createReportUserCompany, findAllReportUserCompanies, findReportUserCompanyById, updateReportUserCompany, softDeleteReportUserCompany } from "../repository/reportUserCompany.repository";
import { ReportUserCompanySchema, CreateReportUserCompanyData, UpdateReportUserCompanyData } from "../schema/reportUserCompany.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const reportUserCompany = await createReportUserCompany(req.body as CreateReportUserCompanyData);
        return res.status(StatusCodes.CREATED).json(reportUserCompany as ReportUserCompanySchema);
    } catch (error) {
        logger.error(`Error creating report user company: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating report user company' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const reportUserCompany = await findReportUserCompanyById(req.params.id);
        return res.status(StatusCodes.OK).json(reportUserCompany as ReportUserCompanySchema);
    } catch (error) {
        logger.error(`Error finding report user company by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding report user company by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const reportUserCompanies = await findAllReportUserCompanies();
        return res.status(StatusCodes.OK).json(reportUserCompanies as ReportUserCompanySchema[]);
    } catch (error) {
        logger.error(`Error finding all report user companies: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all report user companies' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const reportUserCompany = await updateReportUserCompany(req.params.id, req.body as UpdateReportUserCompanyData);
        return res.status(StatusCodes.OK).json(reportUserCompany as ReportUserCompanySchema);
    } catch (error) {
        logger.error(`Error updating report user company: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating report user company' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteReportUserCompany(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Report user company deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting report user company: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting report user company' });
    }
}

