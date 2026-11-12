import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Extender el Request de Express para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: { id: number; rol: string };
    }
  }
}

// 2.1 Verificar firma del JWT[cite: 10, 12]
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //[cite: 12]

  if (!token) return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' }); //[cite: 12]

  try {
    const payloadDecodificado = jwt.verify(token, JWT_SECRET) as { id: number; rol: string }; //[cite: 12]
    req.usuario = payloadDecodificado; //[cite: 12]
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' }); //[cite: 13]
  }
};

// 2.2 Factoría de Roles (RBAC)[cite: 10, 13]
export const requireRole = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) { //[cite: 13]
      return res.status(403).json({ error: 'No tienes los permisos necesarios.' }); //[cite: 13]
    }
    next();
  };
};

// 2.3 Prueba IDOR: Propiedad del Recurso
// Ejemplo: Solo el dueño del turno o un ADMIN puede cancelarlo.
export const checkTurnoOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const turnoId = parseInt(req.params.id);
        const userId = req.usuario!.id;
        
        const turno = await prisma.turno.findUnique({ where: { id: turnoId } });
        if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

        if (req.usuario!.rol === 'ADMIN') return next(); //
        if (turno.usuarioId !== userId) { //[cite: 9]
            return res.status(403).json({ error: 'No tienes permisos para modificar este recurso' }); //[cite: 9]
        }
        next();
    } catch (error) {
        next(error);
    }
};