import { TypeChargeSchema } from "../schema/typeCharge.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createTypeCharge(data: TypeChargeSchema): Promise<TypeChargeSchema> {
    try {
        const typeCharge = await prisma.typeCharge.create({
            data: {
                name: data.name,
            },
        });
        return typeCharge as unknown as TypeChargeSchema;
    } catch (error) {
        logger.error(`Error creating type charge: ${error}`);
        throw new Error('Error creating type charge');
    }
}

export async function findTypeChargeById(id: string): Promise<TypeChargeSchema> {
    try {
        const typeCharge = await prisma.typeCharge.findUnique({
            where: { id },
        });
        return typeCharge as unknown as TypeChargeSchema;
    } catch (error) {
        logger.error(`Error finding type charge by id: ${error}`);
        throw new Error('Error finding type charge by id');
    }
}

export async function findAllTypeCharges(): Promise<TypeChargeSchema[]> {
    try {
        const typeCharges = await prisma.typeCharge.findMany({
            where: { deletedAt: null },
        });
        return typeCharges as unknown as TypeChargeSchema[];
    } catch (error) {
        logger.error(`Error finding all type charges: ${error}`);
        throw new Error('Error finding all type charges');
    }
}

export async function updateTypeCharge(id: string, data: TypeChargeSchema): Promise<TypeChargeSchema> {
    try {
        const typeCharge = await prisma.typeCharge.update({
            where: { id },
            data: {
                name: data.name,
            },
        });
        return typeCharge as unknown as TypeChargeSchema;
    } catch (error) {
        logger.error(`Error updating type charge: ${error}`);
        throw new Error('Error updating type charge');
    }
}

export async function deleteTypeCharge(id: string): Promise<void> {
    try {
        const typeCharge = await prisma.typeCharge.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
        return typeCharge as unknown as void;
} catch (error) {
        logger.error(`Error deleting type charge: ${error}`);
        throw new Error('Error deleting type charge');
    }
}

export async function softDeleteTypeCharge(id: string): Promise<void> {
    try {
        const typeCharge = await prisma.typeCharge.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
        return typeCharge as unknown as void;
    } catch (error) {
        logger.error(`Error soft deleting type charge: ${error}`);
        throw new Error('Error soft deleting type charge');
    }
}