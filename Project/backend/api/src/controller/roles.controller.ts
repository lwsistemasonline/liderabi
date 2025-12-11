import { Request, Response } from "express";
import { createRoles, findAllRoles, findRolesById, findRolesByName, softDeleteRoles, updateRoles } from "../repository/roles.repository";
import { RolesSchema, CreateRolesData, UpdateRolesData } from "../schema/roles.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const roles = await createRoles(req.body as CreateRolesData);
        return res.status(StatusCodes.CREATED).json(roles as RolesSchema);
    } catch (error) {
        logger.error(`Error creating roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating roles' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const roles = await findRolesById(req.params.id);
        return res.status(StatusCodes.OK).json(roles as RolesSchema);
    } catch (error) {
        logger.error(`Error finding roles by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding roles by id' });
    }
}

export async function findByName(req: Request, res: Response) {
    try {
        const roles = await findRolesByName(req.params.name);
        if (!roles) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Roles not found' });
        }
        return res.status(StatusCodes.OK).json(roles as RolesSchema);
    } catch (error) {
        logger.error(`Error finding roles by name: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding roles by name' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const roles = await findAllRoles();
        return res.status(StatusCodes.OK).json(roles as RolesSchema[]);
    } catch (error) {
        logger.error(`Error finding all roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all roles' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const roles = await updateRoles(req.params.id, req.body as UpdateRolesData);
        return res.status(StatusCodes.OK).json(roles as RolesSchema);
    } catch (error) {
        logger.error(`Error updating roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating roles' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteRoles(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Roles deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting roles: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting roles' });
    }
}




