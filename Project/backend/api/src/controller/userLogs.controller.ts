import { Request, Response } from "express";
import { createUserLogs, findAllUserLogs, findUserLogsById, softDeleteUserLogs, updateUserLogs } from "../repository/userLogs.repository";
import { UserLogsSchema, CreateUserLogsData, UpdateUserLogsData } from "../schema/userLogs.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const userLogs = await createUserLogs(req.body as CreateUserLogsData);
        return res.status(StatusCodes.CREATED).json(userLogs as UserLogsSchema);
    } catch (error) {
        logger.error(`Error creating user logs: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user logs' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const userLogs = await findUserLogsById(req.params.id);
        return res.status(StatusCodes.OK).json(userLogs as UserLogsSchema);
    } catch (error) {
        logger.error(`Error finding user logs by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding user logs by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const userLogs = await findAllUserLogs();
        return res.status(StatusCodes.OK).json(userLogs as UserLogsSchema[]);
    } catch (error) {
        logger.error(`Error finding all user logs: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all user logs' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const userLogs = await updateUserLogs(req.params.id, req.body as UpdateUserLogsData);
        return res.status(StatusCodes.OK).json(userLogs as UserLogsSchema);
    } catch (error) {
        logger.error(`Error updating user logs: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating user logs' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteUserLogs(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'User logs deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting user logs: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user logs' });
    }
}




