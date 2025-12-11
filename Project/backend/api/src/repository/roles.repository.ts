import { RolesSchema, CreateRolesData, UpdateRolesData } from "../schema/roles.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createRoles(data: CreateRolesData): Promise<RolesSchema> {
    try {
        const roles = await prisma.roles.create({
            data: {
                name: data.name,
            },
        });
        return roles as unknown as RolesSchema;
    } catch (error) {
        logger.error(`Error creating roles: ${error}`);
        throw new Error('Error creating roles');
    }
}

export async function findRolesById(id: string): Promise<RolesSchema> {
    try {
        const roles = await prisma.roles.findUnique({
            where: { id },
        });
        if (!roles) {
            throw new Error('Roles not found');
        }
        return roles as unknown as RolesSchema;
    } catch (error) {
        logger.error(`Error finding roles by id: ${error}`);
        throw new Error('Error finding roles by id');
    }
}

export async function findRolesByName(name: string): Promise<RolesSchema | null> {
    try {
        const roles = await prisma.roles.findUnique({
            where: { name },
        });
        return roles as unknown as RolesSchema | null;
    } catch (error) {
        logger.error(`Error finding roles by name: ${error}`);
        throw new Error('Error finding roles by name');
    }
}

export async function findAllRoles(): Promise<RolesSchema[]> {
    try {
        const roles = await prisma.roles.findMany({
            where: { deletedAt: null },
        });
        return roles as unknown as RolesSchema[];
    } catch (error) {
        logger.error(`Error finding all roles: ${error}`);
        throw new Error('Error finding all roles');
    }
}

export async function updateRoles(id: string, data: UpdateRolesData): Promise<RolesSchema> {
    try {
        const roles = await prisma.roles.update({
            where: { id },
            data: {
                name: data.name,
            },
        });
        return roles as unknown as RolesSchema;
    } catch (error) {
        logger.error(`Error updating roles: ${error}`);
        throw new Error('Error updating roles');
    }
}

export async function softDeleteRoles(id: string): Promise<void> {
    try {
        await prisma.roles.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting roles: ${error}`);
        throw new Error('Error soft deleting roles');
    }
}




