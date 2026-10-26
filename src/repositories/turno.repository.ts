// src/repositories/turno.repository.ts

export class TurnoRepository {
  // --- ESTADO (Base de datos simulada) ---
  private agenda: Record<string, string> = {};
  private turnoActivo: boolean = false;

  // --- Operaciones para Reservas ---
  guardarTurno(turnoId: string, estado: string): void {
    this.agenda[turnoId] = estado;
  }

  obtenerTurno(turnoId: string): string {
    return this.agenda[turnoId] || 'disponible';
  }

  // --- Operaciones para Cancelaciones ---
  setTurnoActivo(estado: boolean): void {
    this.turnoActivo = estado;
  }

  getTurnoActivo(): boolean {
    return this.turnoActivo;
  }
}