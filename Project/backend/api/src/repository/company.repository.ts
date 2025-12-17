import prisma from "../database/prisma";
import Logger from "../middleware/logger";
import { CompanySchema } from "../schema/company.schema";

const logger = new Logger();

export const createCompany = async (company: CompanySchema) => {

    try {
        return await prisma.company.create({
            data: {
                name: company.name,
                companyGroupId: company.companyGroupId,
                parentCompanyId: company.parentCompanyId,
                typeCompanyId: company.typeCompanyId,
                contactData: company.contactData,
                addressData: company.addressData,
                credentialPowerBi: company.credentialPowerBi,
            },
        });
    } catch (error) {
        logger.error(`Error creating company: ${error}`);
        throw new Error('Error creating company');
    }
};

export const findCompanyById = async (id: string) => {
    try {
        return await prisma.company.findUnique({
            where: { id },
        });
    } catch (error) {
        logger.error(`Error finding company by id: ${error}`);
        throw new Error('Error finding company by id');
    }
};

export const findAllCompanies = async () => {
    try {
        return await prisma.company.findMany({
            where: { deletedAt: null },

            include: {
                companyGroup: true,
                typeCompany: true,
            },
        });
    } catch (error) {
        logger.error(`Error finding all companies: ${error}`);
        throw new Error('Error finding all companies');
    }
};

export const updateCompany = async (id: string, company: CompanySchema) => {
    try {
        return await prisma.company.update({
            where: { id },
            data: {
                name: company.name,
                companyGroupId: company.companyGroupId,
                parentCompanyId: company.parentCompanyId,
                typeCompanyId: company.typeCompanyId,
                contactData: company.contactData,
                addressData: company.addressData,
                credentialPowerBi: company.credentialPowerBi,
            },
            include: {
                companyGroup: true,
                typeCompany: true,
            },
        });
    } catch (error) {
        logger.error(`Error updating company: ${error}`);
        throw new Error('Error updating company');
    }
};

export const deleteCompany = async (id: string) => {
    try {
        return await prisma.company.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    } catch (error) {
        logger.error(`Error soft deleting company: ${error}`);
        throw new Error('Error soft deleting company');
    }
};