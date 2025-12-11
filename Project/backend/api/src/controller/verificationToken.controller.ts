import { Request, Response } from "express";
import { createVerificationToken, deleteVerificationToken, findAllVerificationTokens, findVerificationTokenById, findVerificationTokenByToken, updateVerificationToken } from "../repository/verificationToken.repository";
import { VerificationTokenSchema, CreateVerificationTokenData, UpdateVerificationTokenData } from "../schema/verificationToken.schema";
import { StatusCodes } from "http-status-codes";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function create(req: Request, res: Response) {
    try {
        const verificationToken = await createVerificationToken(req.body as CreateVerificationTokenData);
        return res.status(StatusCodes.CREATED).json(verificationToken as VerificationTokenSchema);
    } catch (error) {
        logger.error(`Error creating verification token: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating verification token' });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const verificationToken = await findVerificationTokenById(req.params.id);
        return res.status(StatusCodes.OK).json(verificationToken as VerificationTokenSchema);
    } catch (error) {
        logger.error(`Error finding verification token by id: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding verification token by id' });
    }
}

export async function findByToken(req: Request, res: Response) {
    try {
        const verificationToken = await findVerificationTokenByToken(req.params.token);
        if (!verificationToken) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Verification token not found' });
        }
        return res.status(StatusCodes.OK).json(verificationToken as VerificationTokenSchema);
    } catch (error) {
        logger.error(`Error finding verification token by token: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding verification token by token' });
    }
}

export async function findAll(_req: Request, res: Response) {
    try {
        const verificationTokens = await findAllVerificationTokens();
        return res.status(StatusCodes.OK).json(verificationTokens as VerificationTokenSchema[]);
    } catch (error) {
        logger.error(`Error finding all verification tokens: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error finding all verification tokens' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const verificationToken = await updateVerificationToken(req.params.id, req.body as UpdateVerificationTokenData);
        return res.status(StatusCodes.OK).json(verificationToken as VerificationTokenSchema);
    } catch (error) {
        logger.error(`Error updating verification token: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating verification token' });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        await deleteVerificationToken(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Verification token deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting verification token: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting verification token' });
    }
}




