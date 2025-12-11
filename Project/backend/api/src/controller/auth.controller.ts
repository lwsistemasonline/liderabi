import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findUserSubscriptionsByEmail } from '../repository/usersSubscriptions.repository';
import { createSession, deleteSessionByToken } from '../repository/session.repository';
import { userSubscriptionsSchema } from '../schema/userSubscriptions.schema';
import Logger from '../middleware/logger';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

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

export async function authenticate(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user subscription by email
    const userSubscription = await findUserSubscriptionsByEmail(email);

    if (!userSubscription) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check if password exists
    if (!userSubscription.password) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Hash the provided password
    const hashedPassword = hashPassword(password);

    //console.log('hashedPassword', hashedPassword);
    //console.log('userSubscription.password', userSubscription.password);

    // Compare passwords
    if (hashedPassword !== userSubscription.password) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Validate and sanitize the user subscription data
    const validatedUserSubscription = userSubscriptionsSchema.parse(userSubscription);
    const sanitizedUserSubscription = sanitizeUserSubscription(validatedUserSubscription);

    // Generate JWT token with 6-hour expiration
    const jwtSecret = process.env.JWT_SECRET || process.env.AUTH_SECRET;
    if (!jwtSecret) {
      logger.error('JWT_SECRET or AUTH_SECRET is not defined in environment variables');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        error: 'Server configuration error' 
      });
    }

    const tokenPayload = {
      userId: sanitizedUserSubscription.userId,
      id: sanitizedUserSubscription.id,
      email: sanitizedUserSubscription.email,
      companyId: sanitizedUserSubscription.companyId,
    };

    const token = jwt.sign(tokenPayload, jwtSecret, {
      expiresIn: '6h'
    });

    // Calculate expiration date (6 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6);

    // Register session in database
    try {
      await createSession(token, sanitizedUserSubscription.userId, expiresAt);
      logger.info(`Session registered for user: ${sanitizedUserSubscription.userId}`);
    } catch (sessionError) {
      logger.error(`Error creating session: ${sessionError}`);
      // Continue even if session creation fails - token is still valid
      // This allows the system to work even if session tracking has issues
    }

    return res.status(StatusCodes.OK).json({
      message: 'Authentication successful',
      token: token,
      userSubscription: sanitizedUserSubscription
    });
  } catch (error) {
    logger.error(`Error authenticating user subscription: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to authenticate user subscription' 
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Authorization token is required' 
      });
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || process.env.AUTH_SECRET;
    
    // Verify token (optional - for logging purposes)
    if (jwtSecret) {
      try {
        jwt.verify(token, jwtSecret);
      } catch (error) {
        // Token might be expired or invalid, but we still try to delete the session
        logger.info('Logout requested with invalid/expired token, attempting to delete session anyway');
      }
    }

    // Unregister session from database
    try {
      const deleteResult = await deleteSessionByToken(token);
      if (deleteResult.count > 0) {
        logger.info(`Session unregistered for token (deleted ${deleteResult.count} session(s))`);
      } else {
        logger.info('No active session found to delete');
      }
    } catch (sessionError) {
      logger.error(`Error deleting session: ${sessionError}`);
      // Continue even if session deletion fails
    }

    return res.status(StatusCodes.OK).json({
      message: 'Logout successful'
    });
  } catch (error) {
    logger.error(`Error during logout: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to logout' 
    });
  }
}



