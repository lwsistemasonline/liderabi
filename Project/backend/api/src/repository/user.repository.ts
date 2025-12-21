import prisma from '../database/prisma';
import { UserSchema, UserSearchSchema } from '../schema/user.schema';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { Prisma } from '../../generated/prisma';

dotenv.config();

export async function findAllUser(search: UserSearchSchema) {
  const where: Prisma.UserWhereInput = {
    deletedAt: null,
  };

  if (search.name) {
    where.name = { contains: search.name, mode: 'insensitive' };
  }

  if (search.email) {
    where.email = { contains: search.email, mode: 'insensitive' };
  }

  if (search.phone) {
    where.mobileNumber = { contains: search.phone, mode: 'insensitive' };
  }

  if (search.telegramId) {
    where.telegramId = { contains: search.telegramId, mode: 'insensitive' };
  }

  if (search.companyId) {
    where.companyId = search.companyId;
  }

  if (search.roleId) {
    where.roleId = search.roleId;
  }

  return await prisma.user.findMany({ where, include: { company: { include: { companyGroup: true } }, role: true } });
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
      role: true,
    },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
      deletedAt: null,
    },
    include: {
      company: {
        include: {
          companyGroup: true,
        },
      },
      role: true,
    },
  });
}

// Helper function to hash password using AUTH_SECRET
function hashPassword(password: string): string {
  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    throw new Error('AUTH_SECRET is not defined in environment variables');
  }

  // Use pbkdf2Sync for password hashing with AUTH_SECRET as salt
  const hash = crypto.pbkdf2Sync(password, authSecret, 10000, 64, 'sha512');
  return hash.toString('hex');
}

export async function createUser(data: UserSchema) {
  // Hash the password before saving
  const hashedPassword = data.password ? hashPassword(data.password) : data.password;

  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        companyId: data.companyId,
        mobileNumber: data.mobileNumber,
        telegramId: data.telegramId,
        image: data.image,
        roleId: data.roleId,
        email: data.email,
        emailVerified: data.emailVerified,
        password: hashedPassword,
      },
      include: {
        company: {
          include: {
            companyGroup: true,
          },
        },
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }

}

export async function updateUser(id: string, data: UserSchema) {
  return await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      companyId: data.companyId,
      mobileNumber: data.mobileNumber,
      telegramId: data.telegramId,
      image: data.image,
      roleId: data.roleId,
      email: data.email,
      emailVerified: data.emailVerified
    },
    include: {
      company: {
        include: {
          companyGroup: true,
        },
      },
      role: true,
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


