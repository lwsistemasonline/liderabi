import prisma from "../lib/prisma";
import Logger from "../middleware/logger";
import { CompanyBillingSchema } from "../schema/companyBilling.schema";

const logger = new Logger();

export async function createCompanyBilling(dataToCreate: CompanyBillingSchema): Promise<CompanyBillingSchema> {
    try {
        const companyBilling = await prisma.company_Billing.create({
            data: {
                companyId: dataToCreate.companyId,
                subscriptionId: dataToCreate.subscriptionId,
                dueDate: dataToCreate.dueDate,
                billingDate: dataToCreate.billingDate,
                valueBilling: dataToCreate.valueBilling,
                paymentDate: dataToCreate.paymentDate,
            },
            include: {
                company: true,
                subscription: true,
            },
        });

        return companyBilling as unknown as CompanyBillingSchema;
    } catch (error) {
        logger.error(`Error creating company billing: ${error}`);
        throw new Error('Error creating company billing');
    }
}

export async function findCompanyBillingById(id: string): Promise<CompanyBillingSchema> {
    try {
        const companyBilling = await prisma.company_Billing.findUnique({
            where: { id },
            include: {
                company: true,
                subscription: true,
            },
        });

        return companyBilling as unknown as CompanyBillingSchema;
    } catch (error) {
        logger.error(`Error finding company billing by id: ${error}`);
        throw new Error(`Error finding company billing by id: ${error}`);
    }
}

export async function findAllCompanyBillings(): Promise<CompanyBillingSchema[]> {
    try {
        const companyBillings = await prisma.company_Billing.findMany({
            where: { deletedAt: null },
            include: {
                company: true,
                subscription: true,
            },
        });

        return companyBillings as unknown as CompanyBillingSchema[];
    } catch (error) {
        logger.error(`Error finding all company billings: ${error}`);
        throw new Error(`Error finding all company billings: ${error}`);
    }
}

export async function updateCompanyBilling(id: string, dataToUpdate: CompanyBillingSchema): Promise<CompanyBillingSchema> {
    try {
        const companyBilling = await prisma.company_Billing.update({
            where: { id },
            data: {
                companyId: dataToUpdate.companyId,
                subscriptionId: dataToUpdate.subscriptionId,
                dueDate: dataToUpdate.dueDate,
                billingDate: dataToUpdate.billingDate,
                valueBilling: dataToUpdate.valueBilling,
                paymentDate: dataToUpdate.paymentDate,
                updatedAt: new Date(),
                deletedAt: null,
            },
        });

        return companyBilling as unknown as CompanyBillingSchema;
    } catch (error) {
        logger.error(`Error updating company billing: ${error}`);
        throw new Error(`Error updating company billing: ${error}`);
    }
}

export async function deleteCompanyBilling(id: string): Promise<void> {
    try {
        const companyBilling = await prisma.company_Billing.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
            include: {
                company: true,
                subscription: true,
            },
        });

        return companyBilling as unknown as void;
    } catch (error) {
        logger.error(`Error deleting company billing: ${error}`);
        throw new Error(`Error deleting company billing: ${error}`);
    }
}