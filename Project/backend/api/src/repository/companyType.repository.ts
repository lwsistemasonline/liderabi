import prisma from '../database/prisma';
import { TypeCompanySchema } from '../schema/companyType.schema';

export async function findAllTypeCompany(): Promise<TypeCompanySchema[]> {
    try {
        const typeCompanies = await prisma.typeCompany.findMany({
            where: {
                deletedAt: null
            }
        });
        return typeCompanies as TypeCompanySchema[];
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function findTypeCompanyById(id: string): Promise<TypeCompanySchema> {
    try {
        const typeCompany = await prisma.typeCompany.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
        return typeCompany as TypeCompanySchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function createTypeCompany(data: TypeCompanySchema): Promise<TypeCompanySchema> {
    try {
        const typeCompany = await prisma.typeCompany.create({ data });
        return typeCompany as TypeCompanySchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function updateTypeCompany(id: string, data: TypeCompanySchema): Promise<TypeCompanySchema> { 
    try {
        const typeCompany = await prisma.typeCompany.update({ where: { id }, data });
        return typeCompany as TypeCompanySchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function softDeleteTypeCompany(id: string): Promise<void> {
    try {
        await prisma.typeCompany.update({ where: { id }, data: { deletedAt: new Date() } });
    } catch (error) {
        throw new Error(error as string);
    }
}
