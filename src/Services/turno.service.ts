export class TurnoService {
  // Simulamos la base de datos temporalmente
  private agenda: Record<string, string> = {};

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
}