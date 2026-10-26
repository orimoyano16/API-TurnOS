// src/Services/turno.service.ts

export interface ResultadoModificacion {
    exito: boolean;
    mensaje: string;
}

export class TurnoService {
  // --- ESTADO PARA RESERVAS ---
  private agenda: Record<string, string> = {};
  
  // --- ESTADO PARA CANCELACIONES ---
  private turnoActivo: boolean = false;

  // ==========================================
  // METODOS DE RESERVA DE TURNO
  // ==========================================

  // Método auxiliar para preparar el escenario en los tests (Given)
  setEstadoAgenda(fecha: string, hora: string, estado: string): void {
    const turnoId = `${fecha} ${hora}`;
    this.agenda[turnoId] = estado;
  }

  // Método auxiliar para validar el resultado (Then)
  getEstadoTurno(fecha: string, hora: string): string {
    const turnoId = `${fecha} ${hora}`;
    return this.agenda[turnoId] || 'disponible';
  }

  // Lógica principal de negocio (When)
  reservarTurno(fecha: string, hora: string): string {
    const turnoId = `${fecha} ${hora}`;
    
    if (this.agenda[turnoId] === 'ocupado') {
      throw new Error('El horario seleccionado no está disponible');
    }

    this.agenda[turnoId] = 'ocupado';
    return 'Reserva exitosa';
  }

  // ==========================================
  // METODOS DE MODIFICACION DE TURNO
  // ==========================================

  modificarTurno(horasAnticipacion: number): ResultadoModificacion {
    // La regla de negocio indica que debe ser 24 horas previas
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

  // Preparamos el escenario simulando que el usuario ya tiene un turno
  setTurnoActivo(estado: boolean): void {
    this.turnoActivo = estado;
  }

  // Lógica principal: evaluamos las horas de anticipación
  cancelarTurno(horasAnticipacion: number): string {
    if (!this.turnoActivo) {
      throw new Error('No hay turno registrado para cancelar');
    }

    this.turnoActivo = false; // El turno queda cancelado

    if (horasAnticipacion >= 24) {
      return 'Cancelación exitosa';
    } else {
      // Como no devuelve un objeto como en modificar, mantenemos tu lógica original devolviendo el string
      return 'No habrá reembolso de su seña';
    }
  }
}