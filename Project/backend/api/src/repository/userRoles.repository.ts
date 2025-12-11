import { UserRolesSchema, CreateUserRolesData, UpdateUserRolesData } from "../schema/userRoles.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createUserRoles(data: CreateUserRolesData): Promise<UserRolesSchema> {
    try {
        const userRoles = await prisma.user_Roles.create({
            data: {
                companyId: data.companyId,
                subscriptionId: data.subscriptionId || null,
                userId: data.userId,
                roleId: data.roleId,
            },
        });
        return userRoles as unknown as UserRolesSchema;
    } catch (error) {
        logger.error(`Error creating user roles: ${error}`);
        throw new Error('Error creating user roles');
    }
}

export async function findUserRolesById(id: string): Promise<UserRolesSchema> {
    try {
        const userRoles = await prisma.user_Roles.findUnique({
            where: { id },
        });
        if (!userRoles) {
            throw new Error('User roles not found');
        }
        return userRoles as unknown as UserRolesSchema;
    } catch (error) {
        logger.error(`Error finding user roles by id: ${error}`);
        throw new Error('Error finding user roles by id');
    }
}

export async function findAllUserRoles(): Promise<UserRolesSchema[]> {
    try {
        const userRoles = await prisma.user_Roles.findMany({
            where: { deletedAt: null },
        });
        return userRoles as unknown as UserRolesSchema[];
    } catch (error) {
        logger.error(`Error finding all user roles: ${error}`);
        throw new Error('Error finding all user roles');
    }
}

export async function updateUserRoles(id: string, data: UpdateUserRolesData): Promise<UserRolesSchema> {
    try {
        const userRoles = await prisma.user_Roles.update({
            where: { id },
            data: {
                subscriptionId: data.subscriptionId,
                roleId: data.roleId,
            },
        });
        return userRoles as unknown as UserRolesSchema;
    } catch (error) {
        logger.error(`Error updating user roles: ${error}`);
        throw new Error('Error updating user roles');
    }
}

export async function softDeleteUserRoles(id: string): Promise<void> {
    try {
        await prisma.user_Roles.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting user roles: ${error}`);
        throw new Error('Error soft deleting user roles');
    }
}

