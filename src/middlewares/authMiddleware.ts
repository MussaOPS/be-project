import {Request, Response, NextFunction} from 'express';
import passport from 'passport';

export const authenticateJWT = passport.authenticate('jwt', {session: false});

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'Forbidden'});
        }
        next();
    };
};
