import { Request, Response } from "express";
import { createTypeCharge, deleteTypeCharge, findAllTypeCharges, findTypeChargeById, updateTypeCharge } from "../repository/typeCharge.repository";
import { TypeChargeSchema } from "../schema/typeCharge.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const typeCharge = await createTypeCharge(req.body as TypeChargeSchema);
        return res.status(StatusCodes.CREATED).json(typeCharge as TypeChargeSchema);
    } catch (error) {
        logger.error(`Error creating type charge: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating type charge' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const typeCharge = await findTypeChargeById(req.params.id);
        return res.status(StatusCodes.OK).json(typeCharge as TypeChargeSchema);
    } catch (error) {
        logger.error(`Error finding type charge by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding type charge by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const typeCharges = await findAllTypeCharges();
        return res.status(StatusCodes.OK).json(typeCharges as TypeChargeSchema[]);
    } catch (error) {
        logger.error(`Error finding all type charges: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all type charges' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const typeCharge = await updateTypeCharge(req.params.id, req.body as TypeChargeSchema);
        return res.status(StatusCodes.OK).json(typeCharge as TypeChargeSchema);
    } catch (error) {
        logger.error(`Error updating type charge: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating type charge' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await deleteTypeCharge(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Type charge deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting type charge: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting type charge' });
    }
}

