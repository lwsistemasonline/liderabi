import prisma from '../database/prisma';
import { CompanyGroupSchema } from "../schema/companyGroup.schema";

export async function findAllCompanyGroup(): Promise<CompanyGroupSchema[]> {
    try {
        const companyGroups = await prisma.companyGroup.findMany({
            where: {
                deletedAt: null
            }
        });
        return companyGroups as CompanyGroupSchema[];
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function findCompanyGroupById(id: string): Promise<CompanyGroupSchema> {
    try {
        const companyGroup = await prisma.companyGroup.findFirst({ 
            where: { 
                id,
                deletedAt: null
            } 
        });
        return companyGroup as CompanyGroupSchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function createCompanyGroup(data: CompanyGroupSchema): Promise<CompanyGroupSchema> {
    try {
        const companyGroup = await prisma.companyGroup.create({ data });
        return companyGroup as CompanyGroupSchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function updateCompanyGroup(id: string, data: CompanyGroupSchema): Promise<CompanyGroupSchema> {
    try {
        const companyGroup = await prisma.companyGroup.update({ where: { id }, data });
        return companyGroup as CompanyGroupSchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function softDeleteCompanyGroup(id: string): Promise<void> {
    try {
        await prisma.companyGroup.update({ where: { id }, data: { deletedAt: new Date() } });
    } catch (error) {
        throw new Error(error as string);
    }
}
