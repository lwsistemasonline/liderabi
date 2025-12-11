import { ObjectsSchema, CreateObjectsData, UpdateObjectsData } from "../schema/objects.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createObjects(data: CreateObjectsData): Promise<ObjectsSchema> {
    try {
        const objects = await prisma.objects.create({
            data: {
                code: data.code,
                name: data.name,
                description: data.description || null,
                price: data.price,
                typeObjectId: data.typeObjectId,
                parentObjectId: data.parentObjectId || null,
            },
        });
        return objects as unknown as ObjectsSchema;
    } catch (error) {
        logger.error(`Error creating objects: ${error}`);
        throw new Error('Error creating objects');
    }
}

export async function findObjectsById(id: string): Promise<ObjectsSchema> {
    try {
        const objects = await prisma.objects.findUnique({
            where: { id },
        });
        if (!objects) {
            throw new Error('Objects not found');
        }
        return objects as unknown as ObjectsSchema;
    } catch (error) {
        logger.error(`Error finding objects by id: ${error}`);
        throw new Error('Error finding objects by id');
    }
}

export async function findObjectsByCode(code: string): Promise<ObjectsSchema | null> {
    try {
        const objects = await prisma.objects.findUnique({
            where: { code },
        });
        return objects as unknown as ObjectsSchema | null;
    } catch (error) {
        logger.error(`Error finding objects by code: ${error}`);
        throw new Error('Error finding objects by code');
    }
}

export async function findAllObjects(): Promise<ObjectsSchema[]> {
    try {
        const objects = await prisma.objects.findMany({
            where: { deletedAt: null },
        });
        return objects as unknown as ObjectsSchema[];
    } catch (error) {
        logger.error(`Error finding all objects: ${error}`);
        throw new Error('Error finding all objects');
    }
}

export async function updateObjects(id: string, data: UpdateObjectsData): Promise<ObjectsSchema> {
    try {
        const objects = await prisma.objects.update({
            where: { id },
            data: {
                code: data.code,
                name: data.name,
                description: data.description,
                price: data.price,
                typeObjectId: data.typeObjectId,
                parentObjectId: data.parentObjectId,
            },
        });
        return objects as unknown as ObjectsSchema;
    } catch (error) {
        logger.error(`Error updating objects: ${error}`);
        throw new Error('Error updating objects');
    }
}

export async function softDeleteObjects(id: string): Promise<void> {
    try {
        await prisma.objects.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting objects: ${error}`);
        throw new Error('Error soft deleting objects');
    }
}




