export class EspecialistaService {
  private especialistas: Record<string, boolean> = {};

  setDisponibilidad(nombre: string, disponible: boolean): void {
    this.especialistas[nombre] = disponible;
  }

  seleccionarEspecialista(nombre: string): string {
    const estaDisponible = this.especialistas[nombre];
    
    if (!estaDisponible) {
      throw new Error('El especialista seleccionado no está disponible');
    }

    return 'Especialista asignado correctamente';
  }
}