import { TypeObjectSchema, CreateTypeObjectData, UpdateTypeObjectData } from "../schema/typeObject.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createTypeObject(data: CreateTypeObjectData): Promise<TypeObjectSchema> {
    try {
console.log('data', data);        
        const typeObject = await prisma.typeObject.create({
            data: {
                name: data.name,
            },
        });
        return typeObject as unknown as TypeObjectSchema;
    } catch (error) {
        logger.error(`Error creating type object: ${error}`);
        throw new Error('Error creating type object');
    }
}

export async function findTypeObjectById(id: string): Promise<TypeObjectSchema> {
    try {
        const typeObject = await prisma.typeObject.findUnique({
            where: { id },
        });
        if (!typeObject) {
            throw new Error('Type object not found');
        }
        return typeObject as unknown as TypeObjectSchema;
    } catch (error) {
        logger.error(`Error finding type object by id: ${error}`);
        throw new Error('Error finding type object by id');
    }
}

export async function findAllTypeObjects(): Promise<TypeObjectSchema[]> {
    try {
        const typeObjects = await prisma.typeObject.findMany({
            where: { deletedAt: null },
        });
        return typeObjects as unknown as TypeObjectSchema[];
    } catch (error) {
        logger.error(`Error finding all type objects: ${error}`);
        throw new Error('Error finding all type objects');
    }
}

export async function updateTypeObject(id: string, data: UpdateTypeObjectData): Promise<TypeObjectSchema> {
    try {
        const typeObject = await prisma.typeObject.update({
            where: { id },
            data: {
                name: data.name,
            },
        });
        return typeObject as unknown as TypeObjectSchema;
    } catch (error) {
        logger.error(`Error updating type object: ${error}`);
        throw new Error('Error updating type object');
    }
}

export async function softDeleteTypeObject(id: string): Promise<void> {
    try {
        await prisma.typeObject.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting type object: ${error}`);
        throw new Error('Error soft deleting type object');
    }
}




