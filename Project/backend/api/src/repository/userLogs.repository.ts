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

export async function searchUserLogs(dateStart: string, dateEnd: string, ip_address: string, userId: string, companyId: string): Promise<UserLogsSchema[]> {
    try {
        const whereClause: any = {
            deletedAt: null,
            datelog: {
                gte: new Date(dateStart + ' 00:00:00'),
                lte: new Date(dateEnd + ' 23:59:59')
            }
        };

        if (ip_address && ip_address !== '') {
            whereClause.ip_address = ip_address;
        }

        if (userId) {
            // Ensure userId is a string, not an object
            // If it's an object with an 'id' property, extract the id value
            const userIdValue = typeof userId === 'string' ? userId : (userId as any)?.id;
            if (userIdValue && userIdValue !== '') {
                whereClause.userId = userIdValue;
            }
        }

        if (companyId) {
            // Ensure companyId is a string, not an object
            // If it's an object with an 'id' property (like { id: "..." }), extract the id value
            // Otherwise use it directly if it's already a string
            const companyIdValue = typeof companyId === 'string' ? companyId : (companyId as any)?.id;
            if (companyIdValue && companyIdValue !== '') {
                whereClause.companyId = companyIdValue;
            }
        }
        
        const userLogs = await prisma.userLogs.findMany({
            where: whereClause,
        });

        return userLogs as unknown as UserLogsSchema[];
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Error searching user logs: ${errorMessage}`);
        throw new Error(errorMessage);
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




