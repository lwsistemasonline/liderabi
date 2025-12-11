import { UserLogsSchema, CreateUserLogsData, UpdateUserLogsData } from "../schema/userLogs.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createUserLogs(data: CreateUserLogsData): Promise<UserLogsSchema> {
    try {
        const userLogs = await prisma.userLogs.create({
            data: {
                userId: data.userId,
                companyId: data.companyId,
                ip_address: data.ip_address,
                endpoint: data.endpoint,
                method: data.method,
                status_code: data.status_code,
                entity: data.entity,
                changes: data.changes || null,
            },
        });
        return userLogs as unknown as UserLogsSchema;
    } catch (error) {
        logger.error(`Error creating user logs: ${error}`);
        throw new Error('Error creating user logs');
    }
}

export async function findUserLogsById(id: string): Promise<UserLogsSchema> {
    try {
        const userLogs = await prisma.userLogs.findUnique({
            where: { id },
        });
        if (!userLogs) {
            throw new Error('User logs not found');
        }
        return userLogs as unknown as UserLogsSchema;
    } catch (error) {
        logger.error(`Error finding user logs by id: ${error}`);
        throw new Error('Error finding user logs by id');
    }
}

export async function findAllUserLogs(): Promise<UserLogsSchema[]> {
    try {
        const userLogs = await prisma.userLogs.findMany({
            where: { deletedAt: null },
        });
        return userLogs as unknown as UserLogsSchema[];
    } catch (error) {
        logger.error(`Error finding all user logs: ${error}`);
        throw new Error('Error finding all user logs');
    }
}

export async function updateUserLogs(id: string, data: UpdateUserLogsData): Promise<UserLogsSchema> {
    try {
        const userLogs = await prisma.userLogs.update({
            where: { id },
            data: {
                ip_address: data.ip_address,
                endpoint: data.endpoint,
                method: data.method,
                status_code: data.status_code,
                entity: data.entity,
                changes: data.changes,
            },
        });
        return userLogs as unknown as UserLogsSchema;
    } catch (error) {
        logger.error(`Error updating user logs: ${error}`);
        throw new Error('Error updating user logs');
    }
}

export async function softDeleteUserLogs(id: string): Promise<void> {
    try {
        await prisma.userLogs.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    } catch (error) {
        logger.error(`Error soft deleting user logs: ${error}`);
        throw new Error('Error soft deleting user logs');
    }
}




