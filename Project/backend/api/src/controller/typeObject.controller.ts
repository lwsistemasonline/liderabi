import { Request, Response } from "express";
import { createTypeObject, findAllTypeObjects, findTypeObjectById, softDeleteTypeObject, updateTypeObject } from "../repository/typeObject.repository";
import { TypeObjectSchema, CreateTypeObjectData, UpdateTypeObjectData } from "../schema/typeObject.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const typeObject = await createTypeObject(req.body as CreateTypeObjectData);
        return res.status(StatusCodes.CREATED).json(typeObject as TypeObjectSchema);
    } catch (error) {
        logger.error(`Error creating type object: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating type object' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const typeObject = await findTypeObjectById(req.params.id);
        return res.status(StatusCodes.OK).json(typeObject as TypeObjectSchema);
    } catch (error) {
        logger.error(`Error finding type object by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding type object by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const typeObjects = await findAllTypeObjects();
        return res.status(StatusCodes.OK).json(typeObjects as TypeObjectSchema[]);
    } catch (error) {
        logger.error(`Error finding all type objects: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all type objects' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const typeObject = await updateTypeObject(req.params.id, req.body as UpdateTypeObjectData);
        return res.status(StatusCodes.OK).json(typeObject as TypeObjectSchema);
    } catch (error) {
        logger.error(`Error updating type object: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating type object' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteTypeObject(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Type object deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting type object: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting type object' });
    }
}




