import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from 'app-domain';
import { AuthServiceImplement } from '../services/auth-service-implement.js';

export const adminMiddleware = (authService: AuthServiceImplement) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ForbiddenError({ user: 'User not authenticated' });
      }

      const isAdmin = await authService.isAdmin(userId);

      if (isAdmin) {
        next();
      } else {
        throw new ForbiddenError({ user: 'Access denied. Administrator privileges required.' });
      }
    } catch (error) {
      next(error);
    }
  };
};