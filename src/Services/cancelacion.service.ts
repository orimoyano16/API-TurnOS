export class CancelacionService {
  private turnoActivo: boolean = false;

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
      return 'No habrá reembolso de su seña';
    }
  }
}