import { Request, Response } from "express";
import { createReport, findAllReports, findReportById, updateReport, softDeleteReport } from "../repository/report.repository";
import { ReportSchema, CreateReportData, UpdateReportData } from "../schema/report.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const report = await createReport(req.body as CreateReportData);
        return res.status(StatusCodes.CREATED).json(report as ReportSchema);
    } catch (error) {
        logger.error(`Error creating report: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating report' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const report = await findReportById(req.params.id);
        return res.status(StatusCodes.OK).json(report as ReportSchema);
    } catch (error) {
        logger.error(`Error finding report by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding report by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const reports = await findAllReports();
        return res.status(StatusCodes.OK).json(reports as ReportSchema[]);
    } catch (error) {
        logger.error(`Error finding all reports: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all reports' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const report = await updateReport(req.params.id, req.body as UpdateReportData);
        return res.status(StatusCodes.OK).json(report as ReportSchema);
    } catch (error) {
        logger.error(`Error updating report: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating report' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteReport(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Report deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting report: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting report' });
    }
}

