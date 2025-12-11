import { RolesObjectsSchema, CreateRolesObjectsData, UpdateRolesObjectsData } from "../schema/rolesObjects.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createRolesObjects(data: CreateRolesObjectsData): Promise<RolesObjectsSchema> {
    try {
        const rolesObjects = await prisma.roles_Objects.create({
            data: {
                roleId: data.roleId,
                objectId: data.objectId,
            },
        });
        return rolesObjects as unknown as RolesObjectsSchema;
    } catch (error) {
        logger.error(`Error creating roles objects: ${error}`);
        throw new Error('Error creating roles objects');
    }
}

export async function findRolesObjectsById(id: string): Promise<RolesObjectsSchema> {
    try {
        const rolesObjects = await prisma.roles_Objects.findUnique({
            where: { id },
        });
        if (!rolesObjects) {
            throw new Error('Roles objects not found');
        }
        return rolesObjects as unknown as RolesObjectsSchema;
    } catch (error) {
        logger.error(`Error finding roles objects by id: ${error}`);
        throw new Error('Error finding roles objects by id');
    }
}

export async function findAllRolesObjects(): Promise<RolesObjectsSchema[]> {
    try {
        const rolesObjects = await prisma.roles_Objects.findMany({
            where: { deletedAt: null },
        });
        return rolesObjects as unknown as RolesObjectsSchema[];
    } catch (error) {
        logger.error(`Error finding all roles objects: ${error}`);
        throw new Error('Error finding all roles objects');
    }
}

export async function updateRolesObjects(id: string, data: UpdateRolesObjectsData): Promise<RolesObjectsSchema> {
    try {
        const rolesObjects = await prisma.roles_Objects.update({
            where: { id },
            data: {
                roleId: data.roleId,
                objectId: data.objectId,
            },
        });
        return rolesObjects as unknown as RolesObjectsSchema;
    } catch (error) {
        logger.error(`Error updating roles objects: ${error}`);
        throw new Error('Error updating roles objects');
    }
}

export async function softDeleteRolesObjects(id: string): Promise<void> {
    try {
        await prisma.roles_Objects.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting roles objects: ${error}`);
        throw new Error('Error soft deleting roles objects');
    }
}

