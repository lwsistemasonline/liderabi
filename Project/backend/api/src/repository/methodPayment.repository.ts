import prisma from "../lib/prisma";
import Logger from "../middleware/logger";
import { MethodPaymentSchema } from "../schema/methodPayment.schema";

const logger = new Logger();

export async function createMethodPayment(data: MethodPaymentSchema): Promise<MethodPaymentSchema> {
    try {
        const methodPayment = await prisma.methodPayment.create({
            data: {
                name: data.name,
            },
        });

        return methodPayment as unknown as MethodPaymentSchema;
    } catch (error) {
        logger.error(`Error creating method payment: ${error}`);
        throw new Error('Error creating method payment');
    }
}

export async function findMethodPaymentById(id: string): Promise<MethodPaymentSchema> {
    try {
        const methodPayment = await prisma.methodPayment.findUnique({
            where: { id },
        });

        return methodPayment as unknown as MethodPaymentSchema;
    } catch (error) {
        logger.error(`Error finding method payment by id: ${error}`);
        throw new Error('Error finding method payment by id');
    }
}

export async function findAllMethodPayments(): Promise<MethodPaymentSchema[]> {
    try {
        const methodPayments = await prisma.methodPayment.findMany({
            where: { deletedAt: null },
        });

        return methodPayments as unknown as MethodPaymentSchema[];
    } catch (error) {
        logger.error(`Error finding all method payments: ${error}`);
        throw new Error('Error finding all method payments');
    }
}

export async function updateMethodPayment(id: string, data: MethodPaymentSchema): Promise<MethodPaymentSchema> {
    try {
        const methodPayment = await prisma.methodPayment.update({
            where: { id },
            data: {
                name: data.name,
            },
        });

        return methodPayment as unknown as MethodPaymentSchema;
    } catch (error) {
        logger.error(`Error updating method payment: ${error}`);
        throw new Error('Error updating method payment');
    }
}

export async function deleteMethodPayment(id: string): Promise<void> {
    try {
        const methodPayment = await prisma.methodPayment.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });

        return methodPayment as unknown as void;
    } catch (error) {
        logger.error(`Error deleting method payment: ${error}`);
        throw new Error('Error deleting method payment');
    }
}