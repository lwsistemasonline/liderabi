import { Request, Response } from "express";
import { createUserRoles, findAllUserRoles, findUserRolesById, softDeleteUserRoles, updateUserRoles } from "../repository/userRoles.repository";
import { UserRolesSchema, CreateUserRolesData, UpdateUserRolesData } from "../schema/userRoles.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const userRoles = await createUserRoles(req.body as CreateUserRolesData);
        return res.status(StatusCodes.CREATED).json(userRoles as UserRolesSchema);
    } catch (error) {
        logger.error(`Error creating user roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user roles' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const userRoles = await findUserRolesById(req.params.id);
        return res.status(StatusCodes.OK).json(userRoles as UserRolesSchema);
    } catch (error) {
        logger.error(`Error finding user roles by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding user roles by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const userRoles = await findAllUserRoles();
        return res.status(StatusCodes.OK).json(userRoles as UserRolesSchema[]);
    } catch (error) {
        logger.error(`Error finding all user roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all user roles' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const userRoles = await updateUserRoles(req.params.id, req.body as UpdateUserRolesData);
        return res.status(StatusCodes.OK).json(userRoles as UserRolesSchema);
    } catch (error) {
        logger.error(`Error updating user roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating user roles' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteUserRoles(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'User roles deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting user roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user roles' });
    }
}




