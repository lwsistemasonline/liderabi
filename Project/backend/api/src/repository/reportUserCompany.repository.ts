import { ReportUserCompanySchema, CreateReportUserCompanyData, UpdateReportUserCompanyData } from "../schema/reportUserCompany.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createReportUserCompany(data: CreateReportUserCompanyData): Promise<ReportUserCompanySchema> {
    try {
        const reportUserCompany = await prisma.report_User_Company.create({
            data: {
                userId: data.userId,
                companyId: data.companyId,
                reportId: data.reportId,
                isActive: data.isActive,
            },
        });
        return reportUserCompany as unknown as ReportUserCompanySchema;
    } catch (error) {
        logger.error(`Error creating report user company: ${error}`);
        throw new Error('Error creating report user company');
    }
}

export async function findReportUserCompanyById(id: string): Promise<ReportUserCompanySchema> {
    try {
        const reportUserCompany = await prisma.report_User_Company.findUnique({
            where: { id },
        });
        if (!reportUserCompany) {
            throw new Error('Report user company not found');
        }
        return reportUserCompany as unknown as ReportUserCompanySchema;
    } catch (error) {
        logger.error(`Error finding report user company by id: ${error}`);
        throw new Error('Error finding report user company by id');
    }
}

export async function findAllReportUserCompanies(): Promise<ReportUserCompanySchema[]> {
    try {
        const reportUserCompanies = await prisma.report_User_Company.findMany({
            where: { deletedAt: null },
        });
        return reportUserCompanies as unknown as ReportUserCompanySchema[];
    } catch (error) {
        logger.error(`Error finding all report user companies: ${error}`);
        throw new Error('Error finding all report user companies');
    }
}

export async function updateReportUserCompany(id: string, data: UpdateReportUserCompanyData): Promise<ReportUserCompanySchema> {
    try {
        const reportUserCompany = await prisma.report_User_Company.update({
            where: { id },
            data: {
                userId: data.userId,
                companyId: data.companyId,
                reportId: data.reportId,
            },
        });
        return reportUserCompany as unknown as ReportUserCompanySchema;
    } catch (error) {
        logger.error(`Error updating report user company: ${error}`);
        throw new Error('Error updating report user company');
    }
}

export async function softDeleteReportUserCompany(id: string): Promise<void> {
    try {
        await prisma.report_User_Company.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting report user company: ${error}`);
        throw new Error('Error soft deleting report user company');
    }
}

