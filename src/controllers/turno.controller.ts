// src/controllers/turno.controller.ts

import { Request, Response } from 'express';
import { TurnoService } from '../services/turno.service';
import { EspecialistaService } from '../services/especialista.service';

const turnoService = new TurnoService();
const especialistaService = new EspecialistaService();

export const reservarTurno = async (req: Request, res: Response) => {
  try {
    const { fecha, hora } = req.body;
    const mensaje = await turnoService.reservarTurno(fecha, hora);
    res.status(200).json({ exito: true, mensaje });
  } catch (error: any) {
    res.status(400).json({ exito: false, error: error.message });
  }
};

export const seleccionarEspecialista = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const mensaje = await especialistaService.seleccionarEspecialista(nombre);
    res.status(200).json({ exito: true, mensaje });
  } catch (error: any) {
    res.status(400).json({ exito: false, error: error.message });
  }
};

export const cancelarTurno = async (req: Request, res: Response) => {
  try {
    // Agregamos fecha y hora para identificar qué turno se va a cancelar
    const { fecha, hora, horasAnticipacion } = req.body;
    
    const turnoId = `${fecha} ${hora}`;
    const mensaje = await turnoService.cancelarTurno(turnoId, horasAnticipacion);
    
    res.status(200).json({ exito: true, mensaje });
  } catch (error: any) {
    res.status(400).json({ exito: false, error: error.message });
  }
};