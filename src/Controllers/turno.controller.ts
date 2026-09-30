
import { Request, Response } from 'express';
import { TurnoService } from '../Services/turno.service';
import { EspecialistaService } from '../Services/especialista.service';
import { CancelacionService } from '../Services/cancelacion.service';


// Instanciamos los servicios (simulando una base de datos en memoria para la API)
const turnoService = new TurnoService();
const especialistaService = new EspecialistaService();
const cancelacionService = new CancelacionService();

// Pre-cargamos algunos datos iniciales para poder probar la API
turnoService.setEstadoAgenda('2026-10-20', '10:00', 'disponible');
especialistaService.setDisponibilidad('Dr. Marranti', true);
cancelacionService.setTurnoActivo(true);

export const reservarTurno = (req: Request, res: Response) => {
  try {
    const { fecha, hora } = req.body;
    const mensaje = turnoService.reservarTurno(fecha, hora);
    res.status(200).json({ exito: true, mensaje });
  } catch (error: any) {
    res.status(400).json({ exito: false, error: error.message });
  }
};

export const seleccionarEspecialista = (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const mensaje = especialistaService.seleccionarEspecialista(nombre);
    res.status(200).json({ exito: true, mensaje });
  } catch (error: any) {
    res.status(400).json({ exito: false, error: error.message });
  }
};

export const cancelarTurno = (req: Request, res: Response) => {
  try {
    const { horasAnticipacion } = req.body;
    const mensaje = cancelacionService.cancelarTurno(horasAnticipacion);
    res.status(200).json({ exito: true, mensaje });
  } catch (error: any) {
    res.status(400).json({ exito: false, error: error.message });
  }
};