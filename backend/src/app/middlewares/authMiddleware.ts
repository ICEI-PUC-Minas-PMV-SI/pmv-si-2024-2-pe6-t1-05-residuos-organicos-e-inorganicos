import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'ecoponto';

export interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth;


  if (!token) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    // @ts-ignore
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Token inválido ou expirado.' });
  }
}
