import { VerificationTokenSchema, CreateVerificationTokenData, UpdateVerificationTokenData } from "../schema/verificationToken.schema";
import prisma from "../lib/prisma";
import Logger from "../middleware/logger";

const logger = new Logger();

export async function createVerificationToken(data: CreateVerificationTokenData): Promise<VerificationTokenSchema> {
    try {
        const verificationToken = await prisma.verificationToken.create({
            data: {
                identifier: data.identifier,
                token: data.token,
                expires: data.expires,
            },
        });
        return verificationToken as unknown as VerificationTokenSchema;
    } catch (error) {
        logger.error(`Error creating verification token: ${error}`);
        throw new Error('Error creating verification token');
    }
}

export async function findVerificationTokenById(id: string): Promise<VerificationTokenSchema> {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { id },
        });
        if (!verificationToken) {
            throw new Error('Verification token not found');
        }
        return verificationToken as unknown as VerificationTokenSchema;
    } catch (error) {
        logger.error(`Error finding verification token by id: ${error}`);
        throw new Error('Error finding verification token by id');
    }
}

export async function findVerificationTokenByToken(token: string): Promise<VerificationTokenSchema | null> {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
        });
        return verificationToken as unknown as VerificationTokenSchema | null;
    } catch (error) {
        logger.error(`Error finding verification token by token: ${error}`);
        throw new Error('Error finding verification token by token');
    }
}

export async function findAllVerificationTokens(): Promise<VerificationTokenSchema[]> {
    try {
        const verificationTokens = await prisma.verificationToken.findMany();
        return verificationTokens as unknown as VerificationTokenSchema[];
    } catch (error) {
        logger.error(`Error finding all verification tokens: ${error}`);
        throw new Error('Error finding all verification tokens');
    }
}

export async function updateVerificationToken(id: string, data: UpdateVerificationTokenData): Promise<VerificationTokenSchema> {
    try {
        const verificationToken = await prisma.verificationToken.update({
            where: { id },
            data: {
                identifier: data.identifier,
                token: data.token,
                expires: data.expires,
            },
        });
        return verificationToken as unknown as VerificationTokenSchema;
    } catch (error) {
        logger.error(`Error updating verification token: ${error}`);
        throw new Error('Error updating verification token');
    }
}

export async function deleteVerificationToken(id: string): Promise<void> {
    try {
        await prisma.verificationToken.delete({
            where: { id },
        });
    } catch (error) {
        logger.error(`Error deleting verification token: ${error}`);
        throw new Error('Error deleting verification token');
    }
}




