// modificar_turno.service.ts

export interface ResultadoModificacion {
    exito: boolean;
    mensaje: string;
}

export class ModificarTurnoService {
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
}