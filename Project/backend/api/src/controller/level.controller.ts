import { Request, Response } from 'express';
import { findAllLevel, findLevelById, createLevel, updateLevel, softDeleteLevel } from '../repository/level.repository';
import { CreateLevelData, LevelSchema, UpdateLevelData } from '../schema/level.schema';
import { StatusCodes } from 'http-status-codes';

export async function getAll(_req: Request, res: Response) {
    try {
        const levels = await findAllLevel();
        return res.status(StatusCodes.OK).json(levels as LevelSchema[]);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get levels' });
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const level = await findLevelById(req.params.id);
        return res.status(StatusCodes.OK).json(level as LevelSchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get level' });
    }
}

export async function create(req: Request, res: Response) {
    try {
        const level = await createLevel(req.body as CreateLevelData);
        return res.status(StatusCodes.CREATED).json(level as LevelSchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create level' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const level = await updateLevel(req.params.id, req.body as UpdateLevelData);
        return res.status(StatusCodes.OK).json(level as LevelSchema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update level' });
    }
}

export async function softDelete(req: Request, res: Response) {
    try {
        await softDeleteLevel(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'Level deleted successfully' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete level' });
    }
}