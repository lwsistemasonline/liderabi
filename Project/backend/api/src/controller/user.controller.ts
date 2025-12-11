import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, z } from 'zod';
import { findAllUser, findUserById, createUser, updateUser, softDeleteUser } from '../repository/user.repository';
import { userSchema } from '../schema/user.schema';
import Logger from '../middleware/logger';

const logger = new Logger();

export async function getAll(_req: Request, res: Response) {
    try {
      const users = await findAllUser();
      const validatedUsers = z.array(userSchema).parse(users);
      return res.status(StatusCodes.OK).json(validatedUsers);
    } catch (error) {
      logger.error(`Error fetching users: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Data validation error', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch users' });
    }
  }

export async function get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await findUserById(id);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }

      const validatedUser = userSchema.parse(user);
      return res.status(StatusCodes.OK).json(validatedUser);
    } catch (error) {
      logger.error(`Error fetching user: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Data validation error', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch user' });
    }
  }

export async function create(req: Request, res: Response) {
    try {
      const { name, companyId, mobileNumber, telegramId, image } = req.body;

      if (!name || !companyId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name and companyId are required' });
      }

      const user = await createUser({
        name,
        companyId,
        mobileNumber,
        telegramId,
        image,
      });

      const validatedUser = userSchema.parse(user);
      return res.status(StatusCodes.CREATED).json(validatedUser);
    } catch (error) {
      logger.error(`Error creating user: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Data validation error', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create user' });
    }
  }

export async function update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, companyId, mobileNumber, telegramId, image } = req.body;

      const user = await updateUser(id, {
        name,
        companyId,
        mobileNumber,
        telegramId,
        image,
      });

      const validatedUser = userSchema.parse(user);
      return res.json(validatedUser);
    } catch (error) {
      logger.error(`Error updating user: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Data validation error', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update user' });
    }
  }

export async function softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await softDeleteUser(id);
      const validatedUser = userSchema.parse(user);
      return res.status(StatusCodes.OK).json({ message: 'User deleted successfully', validatedUser });
    } catch (error) {
      logger.error(`Error deleting user: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Data validation error', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete user' });
    }
  }


