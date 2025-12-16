import { Request, Response } from "express";
import { createUserLogs, findUserLogsById, searchUserLogs, softDeleteUserLogs, updateUserLogs } from "../repository/userLogs.repository";
import { UserLogsSchema, CreateUserLogsData, UpdateUserLogsData } from "../schema/userLogs.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

interface searchLog {
    dateStart: string;
    dateEnd: string;
    ip_address: string;
    userId: string;
    companyId: string;
}

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

export async function searchAll(req: Request, res: Response) {
    try {
        const { dateStart, dateEnd, ip_address, userId, companyId } = req.body as searchLog;

        console.log(req.body);

        const userLogs = await searchUserLogs(dateStart, dateEnd, ip_address, userId, companyId);

        //if (userLogs.length === 0) {
        //    return res.status(StatusCodes.NOT_FOUND).json({ message: 'No user logs found' });
        //} else {
            return res.status(StatusCodes.OK).json(userLogs as UserLogsSchema[]);
        //}

    } catch (error) {
        logger.error(`Error searching user logs: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error searching user logs' });
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




