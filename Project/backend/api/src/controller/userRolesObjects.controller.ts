import { Request, Response } from "express";
import { createUserRolesObjects, findAllUserRolesObjects, findUserRolesObjectsById, softDeleteUserRolesObjects, updateUserRolesObjects } from "../repository/userRolesObjects.repository";
import { UserRolesObjectsSchema, CreateUserRolesObjectsData, UpdateUserRolesObjectsData } from "../schema/userRolesObjects.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const userRolesObjects = await createUserRolesObjects(req.body as CreateUserRolesObjectsData);
        return res.status(StatusCodes.CREATED).json(userRolesObjects as UserRolesObjectsSchema);
    } catch (error) {
        logger.error(`Error creating user roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user roles objects' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const userRolesObjects = await findUserRolesObjectsById(req.params.id);
        return res.status(StatusCodes.OK).json(userRolesObjects as UserRolesObjectsSchema);
    } catch (error) {
        logger.error(`Error finding user roles objects by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding user roles objects by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const userRolesObjects = await findAllUserRolesObjects();
        return res.status(StatusCodes.OK).json(userRolesObjects as UserRolesObjectsSchema[]);
    } catch (error) {
        logger.error(`Error finding all user roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all user roles objects' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const userRolesObjects = await updateUserRolesObjects(req.params.id, req.body as UpdateUserRolesObjectsData);
        return res.status(StatusCodes.OK).json(userRolesObjects as UserRolesObjectsSchema);
    } catch (error) {
        logger.error(`Error updating user roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating user roles objects' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteUserRolesObjects(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'User roles objects deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting user roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user roles objects' });
    }
}




