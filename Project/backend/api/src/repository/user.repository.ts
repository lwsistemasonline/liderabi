import prisma from '../database/prisma';
import { CreateUserData, UpdateUserData } from '../schema/user.schema';

export async function findAllUser() {
    return await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        company: {
          include: {
            companyGroup: true,
          },
        },
      },
    });
  }

export async function findUserById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        company: {
          include: {
            companyGroup: true,
          },
        },
        userCompanySubscriptionAccesses: {
          where: {
            deletedAt: null,
          },
          include: {
            subscription: {
              include: {
                level: true,
              },
            },
            role: true,
          },
        },
      },
    });
  }

export async function createUser(data: CreateUserData) {
    return await prisma.user.create({
      data: {
        name: data.name,
        companyId: data.companyId,
        mobileNumber: data.mobileNumber,
        telegramId: data.telegramId,
        image: data.image,
      },
      include: {
        company: {
          include: {
            companyGroup: true,
          },
        },
      },
    });
  }

export async function updateUser(id: string, data: UpdateUserData) {
    return await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        companyId: data.companyId,
        mobileNumber: data.mobileNumber,
        telegramId: data.telegramId,
        image: data.image,
      },
      include: {
        company: {
          include: {
            companyGroup: true,
          },
        },
      },
    });
  }

export async function softDeleteUser(id: string) {
    return await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
}


