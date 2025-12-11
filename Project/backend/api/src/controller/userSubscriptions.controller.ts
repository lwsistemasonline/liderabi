import { findAllUserSubscriptions, findUserSubscriptionsById, createUserSubscriptions, updateUserSubscriptions, softDeleteUserSubscriptions } from '../repository/usersSubscriptions.repository';
import { userSubscriptionsSchema } from '../schema/userSubscriptions.schema';
import Logger from '../middleware/logger';
import { ZodError, z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import crypto from 'crypto';

const logger = new Logger();

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

// Helper function to remove password from user subscription object
function sanitizeUserSubscription(data: any): any {
  if (!data) return data;
  const { password, ...sanitized } = data;
  return sanitized;
}

// Helper function to remove password from array of user subscriptions
function sanitizeUserSubscriptionsArray(data: any[]): any[] {
  return data.map(item => sanitizeUserSubscription(item));
}

export async function getAll(_req: Request, res: Response) {
  try {
    const userSubscriptions = await findAllUserSubscriptions();
    const validatedUserSubscriptions = z.array(userSubscriptionsSchema).parse(userSubscriptions);
    const sanitizedUserSubscriptions = sanitizeUserSubscriptionsArray(validatedUserSubscriptions);

    return res.status(StatusCodes.OK).json(sanitizedUserSubscriptions);
  } catch (error) {
    
    logger.error(`Error fetching user subscriptions: ${error}`);

    if (error instanceof ZodError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        error: 'Data validation error', 
        details: error.issues 
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch user subscriptions' });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userSubscription = await findUserSubscriptionsById(id);
    const validatedUserSubscription = userSubscriptionsSchema.parse(userSubscription);
    const sanitizedUserSubscription = sanitizeUserSubscription(validatedUserSubscription);
    return res.status(StatusCodes.OK).json(sanitizedUserSubscription);
  } catch (error) {
    logger.error(`Error fetching user subscription: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch user subscription' });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { userId, companyId, subscriptionId, roleId, email, emailVerified, password } = req.body;
    
    // Hash password if provided
    const hashedPassword = password ? hashPassword(password) : undefined;
    
    const userSubscription = await createUserSubscriptions({ 
      userId, 
      companyId, 
      subscriptionId, 
      roleId, 
      email, 
      emailVerified, 
      password: hashedPassword 
    });
    const validatedUserSubscription = userSubscriptionsSchema.parse(userSubscription);
    const sanitizedUserSubscription = sanitizeUserSubscription(validatedUserSubscription);
    return res.status(StatusCodes.CREATED).json(sanitizedUserSubscription);
  } catch (error) {
    logger.error(`Error creating user subscription: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create user subscription' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId, companyId, subscriptionId, roleId, email, emailVerified, password } = req.body;
    
    // Hash password if provided
    const hashedPassword = password ? hashPassword(password) : undefined;
    
    const userSubscription = await updateUserSubscriptions(id, { 
      userId, 
      companyId, 
      subscriptionId, 
      roleId, 
      email, 
      emailVerified, 
      password: hashedPassword 
    });
    const validatedUserSubscription = userSubscriptionsSchema.parse(userSubscription);
    const sanitizedUserSubscription = sanitizeUserSubscription(validatedUserSubscription);
    return res.status(StatusCodes.OK).json(sanitizedUserSubscription);
  } catch (error) {
    logger.error(`Error updating user subscription: ${error}`);
    if (error instanceof ZodError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        error: 'Data validation error', 
        details: error.issues 
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update user subscription' });
  }
}

export async function softDelete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userSubscription = await softDeleteUserSubscriptions(id);
    const validatedUserSubscription = userSubscriptionsSchema.parse(userSubscription);
    const sanitizedUserSubscription = sanitizeUserSubscription(validatedUserSubscription);
    return res.status(StatusCodes.OK).json(sanitizedUserSubscription);
  } catch (error) {
    logger.error(`Error deleting user subscription: ${error}`);
    if (error instanceof ZodError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        error: 'Data validation error', 
        details: error.issues 
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete user subscription' });
  }
}