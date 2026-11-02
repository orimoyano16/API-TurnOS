// src/services/turno.service.ts

import { TurnoRepository } from '../repositories/turno.repository';

export interface ResultadoModificacion {
    exito: boolean;
    mensaje: string;
}

export class TurnoService {
  private turnoRepository: TurnoRepository;

  constructor() {
    this.turnoRepository = new TurnoRepository();
  }

  async setEstadoAgenda(fecha: string, hora: string, estado: string): Promise<void> {
    const turnoId = `${fecha} ${hora}`;
    await this.turnoRepository.guardarTurno(turnoId, estado);
  }

  async getEstadoTurno(fecha: string, hora: string): Promise<string> {
    const turnoId = `${fecha} ${hora}`;
    return await this.turnoRepository.obtenerTurno(turnoId);
  }

  async reservarTurno(fecha: string, hora: string): Promise<string> {
    const turnoId = `${fecha} ${hora}`;
    
    const estadoActual = await this.turnoRepository.obtenerTurno(turnoId);
    if (estadoActual === 'ocupado') {
      throw new Error('El horario seleccionado no está disponible');
    }

    await this.turnoRepository.guardarTurno(turnoId, 'ocupado');
    return 'Reserva exitosa';
  }

  modificarTurno(horasAnticipacion: number): ResultadoModificacion {
    if (horasAnticipacion >= 24) {
        return { exito: true, mensaje: "Modificacion exitosa." };
    } else {
        return { exito: false, mensaje: "No se puede modificar, faltan menos de 24 horas." };
    }
  }

  // NOTA: Como la base de datos ahora asocia el estado activo a un turno específico, 
  // necesitamos pasar el turnoId ('fecha hora') a estos métodos.
  async setTurnoActivo(turnoId: string, estado: boolean): Promise<void> {
    await this.turnoRepository.setTurnoActivo(turnoId, estado);
  }

  async cancelarTurno(turnoId: string, horasAnticipacion: number): Promise<string> {
    const estaActivo = await this.turnoRepository.getTurnoActivo(turnoId);
    
    if (!estaActivo) {
      throw new Error('No hay turno registrado para cancelar');
    }

    await this.turnoRepository.setTurnoActivo(turnoId, false); 
    await this.turnoRepository.guardarTurno(turnoId, 'disponible'); // Opcional: liberamos el horario

    if (horasAnticipacion >= 24) {
      return 'Cancelación exitosa';
    } else {
      return 'No habrá reembolso de su seña';
    }
  }
}