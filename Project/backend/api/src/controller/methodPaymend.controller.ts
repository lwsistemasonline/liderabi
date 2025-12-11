import { Request, Response } from "express";
import { createMethodPayment, deleteMethodPayment, findAllMethodPayments, findMethodPaymentById, updateMethodPayment } from "../repository/methodPayment.repository";
import { MethodPaymentSchema } from "../schema/methodPayment.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const methodPayment = await createMethodPayment(req.body as MethodPaymentSchema);
        return res.status(StatusCodes.CREATED).json(methodPayment as MethodPaymentSchema);
    } catch (error) {
        logger.error(`Error creating method payment: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating method payment' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const methodPayment = await findMethodPaymentById(req.params.id);
        return res.status(StatusCodes.OK).json(methodPayment as MethodPaymentSchema);
    } catch (error) {
        logger.error(`Error finding method payment by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding method payment by id' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const methodPayments = await findAllMethodPayments();
        return res.status(StatusCodes.OK).json(methodPayments as MethodPaymentSchema[]);
    } catch (error) {
        logger.error(`Error finding all method payments: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all method payments' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const methodPayment = await updateMethodPayment(req.params.id, req.body as MethodPaymentSchema);
        return res.status(StatusCodes.OK).json(methodPayment as MethodPaymentSchema);
    } catch (error) {
        logger.error(`Error updating method payment: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating method payment' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await deleteMethodPayment(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Method payment deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting method payment: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting method payment' });
    }
}

