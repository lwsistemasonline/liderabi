import { UserRolesObjectsSchema, CreateUserRolesObjectsData, UpdateUserRolesObjectsData } from "../schema/userRolesObjects.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createUserRolesObjects(data: CreateUserRolesObjectsData): Promise<UserRolesObjectsSchema> {
    try {
        const userRolesObjects = await prisma.user_Roles_Objects.create({
            data: {
                userRoleId: data.userRoleId,
                objectId: data.objectId,
            },
        });
        return userRolesObjects as unknown as UserRolesObjectsSchema;
    } catch (error) {
        logger.error(`Error creating user roles objects: ${error}`);
        throw new Error('Error creating user roles objects');
    }
}

export async function findUserRolesObjectsById(id: string): Promise<UserRolesObjectsSchema> {
    try {
        const userRolesObjects = await prisma.user_Roles_Objects.findUnique({
            where: { id },
        });
        if (!userRolesObjects) {
            throw new Error('User roles objects not found');
        }
        return userRolesObjects as unknown as UserRolesObjectsSchema;
    } catch (error) {
        logger.error(`Error finding user roles objects by id: ${error}`);
        throw new Error('Error finding user roles objects by id');
    }
}

export async function findAllUserRolesObjects(): Promise<UserRolesObjectsSchema[]> {
    try {
        const userRolesObjects = await prisma.user_Roles_Objects.findMany({
            where: { deletedAt: null },
        });
        return userRolesObjects as unknown as UserRolesObjectsSchema[];
    } catch (error) {
        logger.error(`Error finding all user roles objects: ${error}`);
        throw new Error('Error finding all user roles objects');
    }
}

export async function updateUserRolesObjects(id: string, data: UpdateUserRolesObjectsData): Promise<UserRolesObjectsSchema> {
    try {
        const userRolesObjects = await prisma.user_Roles_Objects.update({
            where: { id },
            data: {
                userRoleId: data.userRoleId,
                objectId: data.objectId,
            },
        });
        return userRolesObjects as unknown as UserRolesObjectsSchema;
    } catch (error) {
        logger.error(`Error updating user roles objects: ${error}`);
        throw new Error('Error updating user roles objects');
    }
}

export async function softDeleteUserRolesObjects(id: string): Promise<void> {
    try {
        await prisma.user_Roles_Objects.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting user roles objects: ${error}`);
        throw new Error('Error soft deleting user roles objects');
    }
}

