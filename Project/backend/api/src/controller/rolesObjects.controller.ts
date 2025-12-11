import { Request, Response } from "express";
import { createRolesObjects, findAllRolesObjects, findRolesObjectsById, softDeleteRolesObjects, updateRolesObjects } from "../repository/rolesObjects.repository";
import { RolesObjectsSchema, CreateRolesObjectsData, UpdateRolesObjectsData } from "../schema/rolesObjects.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const rolesObjects = await createRolesObjects(req.body as CreateRolesObjectsData);
        return res.status(StatusCodes.CREATED).json(rolesObjects as RolesObjectsSchema);
    } catch (error) {
        logger.error(`Error creating roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating roles objects' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const rolesObjects = await findRolesObjectsById(req.params.id);
        return res.status(StatusCodes.OK).json(rolesObjects as RolesObjectsSchema);
    } catch (error) {
        logger.error(`Error finding roles objects by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding roles objects by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const rolesObjects = await findAllRolesObjects();
        return res.status(StatusCodes.OK).json(rolesObjects as RolesObjectsSchema[]);
    } catch (error) {
        logger.error(`Error finding all roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all roles objects' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const rolesObjects = await updateRolesObjects(req.params.id, req.body as UpdateRolesObjectsData);
        return res.status(StatusCodes.OK).json(rolesObjects as RolesObjectsSchema);
    } catch (error) {
        logger.error(`Error updating roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating roles objects' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteRolesObjects(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Roles objects deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting roles objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting roles objects' });
    }
}




