import { ReportSchema, CreateReportData, UpdateReportData } from "../schema/report.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createReport(data: CreateReportData): Promise<ReportSchema> {
    try {
        const report = await prisma.report.create({
            data: {
                name: data.name,
                workspaceId: data.workspaceId,
                reportId: data.reportId,
                embedUrl: data.embedUrl,
                datasetId: data.datasetId,
                companyId: data.companyId,
            },
        });
        return report as unknown as ReportSchema;
    } catch (error) {
        logger.error(`Error creating report: ${error}`);
        throw new Error('Error creating report');
    }
}

export async function findReportById(id: string): Promise<ReportSchema> {
    try {
        const report = await prisma.report.findUnique({
            where: { id },
        });
        if (!report) {
            throw new Error('Report not found');
        }
        return report as unknown as ReportSchema;
    } catch (error) {
        logger.error(`Error finding report by id: ${error}`);
        throw new Error('Error finding report by id');
    }
}

export async function findAllReports(): Promise<ReportSchema[]> {
    try {
        const reports = await prisma.report.findMany({
            where: { deletedAt: null },
        });
        return reports as unknown as ReportSchema[];
    } catch (error) {
        logger.error(`Error finding all reports: ${error}`);
        throw new Error('Error finding all reports');
    }
}

export async function updateReport(id: string, data: UpdateReportData): Promise<ReportSchema> {
    try {
        const report = await prisma.report.update({
            where: { id },
            data: {
                name: data.name,
                workspaceId: data.workspaceId,
                reportId: data.reportId,
                embedUrl: data.embedUrl,
                datasetId: data.datasetId,
                companyId: data.companyId,
            },
        });
        return report as unknown as ReportSchema;
    } catch (error) {
        logger.error(`Error updating report: ${error}`);
        throw new Error('Error updating report');
    }
}

export async function softDeleteReport(id: string): Promise<void> {
    try {
        await prisma.report.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting report: ${error}`);
        throw new Error('Error soft deleting report');
    }
}

