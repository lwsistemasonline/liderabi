import { ReportWorkspaceSchema, CreateReportWorkspaceData, UpdateReportWorkspaceData } from "../schema/reportWorkspace.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createReportWorkspace(data: CreateReportWorkspaceData): Promise<ReportWorkspaceSchema> {
    try {
        const reportWorkspace = await prisma.report_Workspace.create({
            data: {
                name: data.name,
                workspaceId: data.workspaceId,
                companyId: data.companyId,
            },
        });
        return reportWorkspace as unknown as ReportWorkspaceSchema;
    } catch (error) {
        logger.error(`Error creating report workspace: ${error}`);
        throw new Error('Error creating report workspace');
    }
}

export async function findReportWorkspaceById(id: string): Promise<ReportWorkspaceSchema> {
    try {
        const reportWorkspace = await prisma.report_Workspace.findUnique({
            where: { id },
        });
        if (!reportWorkspace) {
            throw new Error('Report workspace not found');
        }
        return reportWorkspace as unknown as ReportWorkspaceSchema;
    } catch (error) {
        logger.error(`Error finding report workspace by id: ${error}`);
        throw new Error('Error finding report workspace by id');
    }
}

export async function findAllReportWorkspaces(): Promise<ReportWorkspaceSchema[]> {
    try {
        const reportWorkspaces = await prisma.report_Workspace.findMany({
            where: { deletedAt: null },
        });
        return reportWorkspaces as unknown as ReportWorkspaceSchema[];
    } catch (error) {
        logger.error(`Error finding all report workspaces: ${error}`);
        throw new Error('Error finding all report workspaces');
    }
}

export async function updateReportWorkspace(id: string, data: UpdateReportWorkspaceData): Promise<ReportWorkspaceSchema> {
    try {
        const reportWorkspace = await prisma.report_Workspace.update({
            where: { id },
            data: {
                name: data.name,
                workspaceId: data.workspaceId,
                companyId: data.companyId,
            },
        });
        return reportWorkspace as unknown as ReportWorkspaceSchema;
    } catch (error) {
        logger.error(`Error updating report workspace: ${error}`);
        throw new Error('Error updating report workspace');
    }
}

export async function softDeleteReportWorkspace(id: string): Promise<void> {
    try {
        await prisma.report_Workspace.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting report workspace: ${error}`);
        throw new Error('Error soft deleting report workspace');
    }
}

