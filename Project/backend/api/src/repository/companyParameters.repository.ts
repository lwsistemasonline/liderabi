import { CompanyParametersSchema, CreateCompanyParametersData, UpdateCompanyParametersData } from "../schema/companyParameters.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createCompanyParameters(data: CreateCompanyParametersData): Promise<CompanyParametersSchema> {
    try {
        const companyParameters = await prisma.company_Parameters.create({
            data: {
                companyId: data.companyId,
                parameters: data.parameters || null,
            },
        });
        return companyParameters as unknown as CompanyParametersSchema;
    } catch (error) {
        logger.error(`Error creating company parameters: ${error}`);
        throw new Error('Error creating company parameters');
    }
}

export async function findCompanyParametersById(id: string): Promise<CompanyParametersSchema> {
    try {
        const companyParameters = await prisma.company_Parameters.findUnique({
            where: { id },
        });
        if (!companyParameters) {
            throw new Error('Company parameters not found');
        }
        return companyParameters as unknown as CompanyParametersSchema;
    } catch (error) {
        logger.error(`Error finding company parameters by id: ${error}`);
        throw new Error('Error finding company parameters by id');
    }
}

export async function findCompanyParametersByCompanyId(companyId: string): Promise<CompanyParametersSchema | null> {
    try {
        const companyParameters = await prisma.company_Parameters.findFirst({
            where: { companyId, deletedAt: null },
        });
        return companyParameters as unknown as CompanyParametersSchema | null;
    } catch (error) {
        logger.error(`Error finding company parameters by company id: ${error}`);
        throw new Error('Error finding company parameters by company id');
    }
}

export async function findAllCompanyParameters(): Promise<CompanyParametersSchema[]> {
    try {
        const companyParameters = await prisma.company_Parameters.findMany({
            where: { deletedAt: null },
        });
        return companyParameters as unknown as CompanyParametersSchema[];
    } catch (error) {
        logger.error(`Error finding all company parameters: ${error}`);
        throw new Error('Error finding all company parameters');
    }
}

export async function updateCompanyParameters(id: string, data: UpdateCompanyParametersData): Promise<CompanyParametersSchema> {
    try {
        const companyParameters = await prisma.company_Parameters.update({
            where: { id },
            data: {
                parameters: data.parameters,
            },
        });
        return companyParameters as unknown as CompanyParametersSchema;
    } catch (error) {
        logger.error(`Error updating company parameters: ${error}`);
        throw new Error('Error updating company parameters');
    }
}

export async function softDeleteCompanyParameters(id: string): Promise<void> {
    try {
        await prisma.company_Parameters.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting company parameters: ${error}`);
        throw new Error('Error soft deleting company parameters');
    }
}

