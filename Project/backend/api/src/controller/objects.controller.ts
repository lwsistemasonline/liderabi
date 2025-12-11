import { Request, Response } from "express";
import { createObjects, findAllObjects, findObjectsById, findObjectsByCode, softDeleteObjects, updateObjects } from "../repository/objects.repository";
import { ObjectsSchema, CreateObjectsData, UpdateObjectsData } from "../schema/objects.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const objects = await createObjects(req.body as CreateObjectsData);
        return res.status(StatusCodes.CREATED).json(objects as ObjectsSchema);
    } catch (error) {
        logger.error(`Error creating objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating objects' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const objects = await findObjectsById(req.params.id);
        return res.status(StatusCodes.OK).json(objects as ObjectsSchema);
    } catch (error) {
        logger.error(`Error finding objects by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding objects by id' });
    }
}

export async function findByCode(req: Request, res: Response) {
    try {
        const objects = await findObjectsByCode(req.params.code);
        if (!objects) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Objects not found' });
        }
        return res.status(StatusCodes.OK).json(objects as ObjectsSchema);
    } catch (error) {
        logger.error(`Error finding objects by code: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding objects by code' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const objects = await findAllObjects();
        return res.status(StatusCodes.OK).json(objects as ObjectsSchema[]);
    } catch (error) {
        logger.error(`Error finding all objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all objects' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const objects = await updateObjects(req.params.id, req.body as UpdateObjectsData);
        return res.status(StatusCodes.OK).json(objects as ObjectsSchema);
    } catch (error) {
        logger.error(`Error updating objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating objects' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteObjects(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Objects deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting objects' });
    }
}




