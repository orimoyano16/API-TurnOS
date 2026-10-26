// src/Services/turno.service.ts

import { TurnoRepository } from '../repositories/turno.repository';

export interface ResultadoModificacion {
    exito: boolean;
    mensaje: string;
}

export class TurnoService {
  private turnoRepository: TurnoRepository;

  constructor() {
    // Instanciamos el repositorio al crear el servicio
    this.turnoRepository = new TurnoRepository();
  }

  // ==========================================
  // METODOS DE RESERVA DE TURNO
  // ==========================================

  setEstadoAgenda(fecha: string, hora: string, estado: string): void {
    const turnoId = `${fecha} ${hora}`;
    this.turnoRepository.guardarTurno(turnoId, estado);
  }

  getEstadoTurno(fecha: string, hora: string): string {
    const turnoId = `${fecha} ${hora}`;
    return this.turnoRepository.obtenerTurno(turnoId);
  }

  reservarTurno(fecha: string, hora: string): string {
    const turnoId = `${fecha} ${hora}`;
    
    if (this.turnoRepository.obtenerTurno(turnoId) === 'ocupado') {
      throw new Error('El horario seleccionado no está disponible');
    }

    this.turnoRepository.guardarTurno(turnoId, 'ocupado');
    return 'Reserva exitosa';
  }

  // ==========================================
  // METODOS DE MODIFICACION DE TURNO
  // ==========================================

  modificarTurno(horasAnticipacion: number): ResultadoModificacion {
    if (horasAnticipacion >= 24) {
        return {
            exito: true,
            mensaje: "Modificacion exitosa."
        };
    } else {
        return {
            exito: false,
            mensaje: "No se puede modificar, faltan menos de 24 horas."
        };
    }
  }

  // ==========================================
  // METODOS DE CANCELACION DE TURNO
  // ==========================================

  setTurnoActivo(estado: boolean): void {
    this.turnoRepository.setTurnoActivo(estado);
  }

  cancelarTurno(horasAnticipacion: number): string {
    if (!this.turnoRepository.getTurnoActivo()) {
      throw new Error('No hay turno registrado para cancelar');
    }

    this.turnoRepository.setTurnoActivo(false); 

    if (horasAnticipacion >= 24) {
      return 'Cancelación exitosa';
    } else {
      return 'No habrá reembolso de su seña';
    }
  }
}