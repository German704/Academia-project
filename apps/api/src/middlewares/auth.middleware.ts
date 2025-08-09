import { Request, Response, NextFunction } from 'express';
import { AuthServiceImplement } from '../services/auth-service-implement.js';
import { UUID } from 'crypto';

export const authMiddleware = (authService: AuthServiceImplement) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const user = await authService.verifyToken(token);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = { id: user.sub as UUID }; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed.' });
    }
};