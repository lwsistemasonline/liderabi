import prisma from '../database/prisma';
import { CreateLevelData, LevelSchema, UpdateLevelData } from '../schema/level.schema';

export async function findAllLevel() {
    try {
        const levels = await prisma.level.findMany({
            where: { deletedAt: null },
        });
        return levels as LevelSchema[];
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function findLevelById(id: string) {
    try {
        const level = await prisma.level.findUnique({
            where: { id },
        });
        if (!level) {
            throw new Error('Level not found');
        }
        return {
            id: level.id,
            name: level.name,
            createdAt: level?.createdAt,
            updatedAt: level?.updatedAt,
            deletedAt: level?.deletedAt,
        } as LevelSchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function createLevel(data: CreateLevelData) {
    try {
        const level = await prisma.level.create({ data });
        return {
            id: level.id,
            name: level.name,
            createdAt: level.createdAt,
            updatedAt: level.updatedAt,
            deletedAt: level.deletedAt,
        };
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function updateLevel(id: string, data: UpdateLevelData) {
    try {
        const level = await prisma.level.update({ where: { id }, data });
        return {
            id: level.id,
            name: level.name,
            createdAt: level.createdAt,
            updatedAt: level.updatedAt,
            deletedAt: level.deletedAt,
        } as LevelSchema;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function softDeleteLevel(id: string) {
    try {
        const level = await prisma.level.update({ where: { id }, data: { deletedAt: new Date() } });
        return {
            id: level.id,
            name: level.name,
            createdAt: level.createdAt,
            updatedAt: level.updatedAt,
            deletedAt: new Date(),
        } as LevelSchema;
    } catch (error) {
        throw new Error(error as string);
    }
}