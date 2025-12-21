import { Request, Response } from "express";
import { createReportWorkspace, findAllReportWorkspaces, findReportWorkspaceById, updateReportWorkspace, softDeleteReportWorkspace } from "../repository/reportWorkspace.repository";
import { ReportWorkspaceSchema, CreateReportWorkspaceData, UpdateReportWorkspaceData } from "../schema/reportWorkspace.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const reportWorkspace = await createReportWorkspace(req.body as CreateReportWorkspaceData);
        return res.status(StatusCodes.CREATED).json(reportWorkspace as ReportWorkspaceSchema);
    } catch (error) {
        logger.error(`Error creating report workspace: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating report workspace' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const reportWorkspace = await findReportWorkspaceById(req.params.id);
        return res.status(StatusCodes.OK).json(reportWorkspace as ReportWorkspaceSchema);
    } catch (error) {
        logger.error(`Error finding report workspace by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding report workspace by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const reportWorkspaces = await findAllReportWorkspaces();
        return res.status(StatusCodes.OK).json(reportWorkspaces as ReportWorkspaceSchema[]);
    } catch (error) {
        logger.error(`Error finding all report workspaces: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all report workspaces' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const reportWorkspace = await updateReportWorkspace(req.params.id, req.body as UpdateReportWorkspaceData);
        return res.status(StatusCodes.OK).json(reportWorkspace as ReportWorkspaceSchema);
    } catch (error) {
        logger.error(`Error updating report workspace: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating report workspace' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteReportWorkspace(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Report workspace deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting report workspace: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting report workspace' });
    }
}

