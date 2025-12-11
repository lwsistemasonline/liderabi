import prisma from "../database/prisma";
import { CompanySubscriptionSchema } from "../schema/companySubscription.schema";
import Logger from "../middleware/logger";

const logger = new Logger();

export const createCompanySubscription = async (companySubscription: CompanySubscriptionSchema) => {
    try {
        return await prisma.company_Subscription.create({
            data: {
                companyId: companySubscription.companyId,
                levelId: companySubscription.levelId,
                discount: companySubscription.discount,
                methodPaymentId: companySubscription.methodPaymentId,
                typeChargeId: companySubscription.typeChargeId,
                cnpj: companySubscription.cnpj,
            },
        });
    } catch (error) {
        logger.error(`Error creating company subscription: ${error}`);
        throw new Error('Error creating company subscription');
    }
}

export const findCompanySubscriptionById = async (id: string) => {
    try {
        return await prisma.company_Subscription.findUnique({
            where: { id },
            include: {
                company: true,
                level: true,
                methodPayment: true,
                typeCharge: true,
            },
        });
    } catch (error) {
        logger.error(`Error finding company subscription by id: ${error}`);
        throw new Error('Error finding company subscription by id');
    }
}

export const findAllCompanySubscriptions = async () => {
    try {
        return await prisma.company_Subscription.findMany({
            where: { deletedAt: null },
            include: {
                company: true,
                level: true,
                methodPayment: true,
                typeCharge: true,
            },
        });
    } catch (error) {
        logger.error(`Error finding all company subscriptions: ${error}`);
        throw new Error('Error finding all company subscriptions');
    }
}

export const updateCompanySubscription = async (id: string, dataToUpdate: CompanySubscriptionSchema) => {
    try {
        return await prisma.company_Subscription.update({
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        logger.error(`Error updating company subscription: ${error}`);
        throw new Error('Error updating company subscription');
    }
}

export const deleteCompanySubscription = async (id: string) => {
    try {
        return await prisma.company_Subscription.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    } catch (error) {
        logger.error(`Error deleting company subscription: ${error}`);
        throw new Error('Error deleting company subscription');
    }
}