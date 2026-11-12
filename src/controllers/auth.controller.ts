import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;
    
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El email ya está registrado' }); //[cite: 11]
    }

    const salt = await bcrypt.genSalt(12); // 12 rondas es el estándar actual[cite: 8]
    const hashedPassword = await bcrypt.hash(password, salt); //[cite: 12]

    await prisma.usuario.create({
      data: { nombre, email, password: hashedPassword, rol: rol || 'USER' }
    });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente!' }); //[cite: 12]
  } catch (error: any) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' }); //[cite: 12]

    const passwordValida = await bcrypt.compare(password, usuario.password); //[cite: 12]
    if (!passwordValida) return res.status(401).json({ error: 'Credenciales inválidas' }); //[cite: 12]

    // Access Token (vida corta) y Refresh Token (vida larga)[cite: 8]
    const payload = { id: usuario.id, rol: usuario.rol }; //[cite: 12]
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' }); //[cite: 8]
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' }); //[cite: 8]

    res.json({ mensaje: 'Inicio de sesión exitoso', accessToken, refreshToken }); //[cite: 12]
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const refresh = async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'Refresh token requerido' });

    try {
        const payload: any = jwt.verify(token, JWT_REFRESH_SECRET);
        const nuevoPayload = { id: payload.id, rol: payload.rol };
        const nuevoAccessToken = jwt.sign(nuevoPayload, JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: nuevoAccessToken });
    } catch (error) {
        res.status(403).json({ error: 'Refresh token inválido o expirado' });
    }
};