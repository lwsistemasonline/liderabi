import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, z } from 'zod';
import { findAllUser, findUserById, createUser, updateUser, softDeleteUser } from '../repository/user.repository';
import { UserSchema, userSchema, UserSearchSchema, userSearchSchema } from '../schema/user.schema';
import Logger from '../middleware/logger';

const logger = new Logger();

export async function getAll(req: Request, res: Response) {
    try {
      // Validate and sanitize input
      const search = userSearchSchema.parse(req.body || {});
      
      const users = await findAllUser(search as UserSearchSchema);
      
      // Validate and sanitize output by removing sensitive fields
      const validatedUsers = z.array(userSchema).parse(users);
      const sanitizedUsers = validatedUsers.map(({ password, ...user }) => user);

      return res.status(StatusCodes.OK).json(sanitizedUsers);
    } catch (error) {
      logger.error(`Error fetching users: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          error: 'Invalid search parameters', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch users' });
    }
  }

export async function get(req: Request, res: Response) {
    try {
      // Validate and sanitize input
      const idSchema = z.string().min(1, 'User ID is required');
      const { id } = req.params;
      const validatedId = idSchema.parse(id);

      const user = await findUserById(validatedId);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }

      // Validate and sanitize output by removing sensitive fields
      const validatedUser = userSchema.parse(user);
      const { password, ...sanitizedUser } = validatedUser;
      return res.status(StatusCodes.OK).json(sanitizedUser);
    } catch (error) {
      logger.error(`Error fetching user: ${error}`);
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          error: 'Invalid user ID', 
          details: error.issues 
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch user' });
    }
  }

export async function create(req: Request, res: Response) {
    try {
      const user = req.body as UserSchema;

      const newUser = await createUser(user);

      if (!newUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
      }

      // Validate and sanitize response by removing sensitive fields
      const validatedUser = userSchema.parse(newUser);
      const { password, ...sanitizedUser } = validatedUser;
      return res.status(StatusCodes.CREATED).json(sanitizedUser);

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
      const { name, companyId, mobileNumber, telegramId, image, emailVerified, email } = req.body;

      const user = await updateUser(id, {
        name,
        companyId,
        mobileNumber,
        telegramId,
        image,  
        emailVerified,
        email
      }) as UserSchema;

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


