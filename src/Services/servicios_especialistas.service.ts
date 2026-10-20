// servicios_especialistas.service.ts

export interface Especialista {
    id: number;
    nombre: string;
    servicio: string;
}

export interface ResultadoCartilla {
    exito: boolean;
    mensaje: string;
    datos?: Especialista[];
}

export class ServiciosEspecialistasService {
    // Simulamos una base de datos de especialistas y servicios disponibles
    private especialistasDisponibles: Especialista[] = [
        { id: 1, nombre: "Dr. Perez", servicio: "Cardiología" },
        { id: 2, nombre: "Dra. Gomez", servicio: "Dermatología" },
        { id: 3, nombre: "Dr. Lopez", servicio: "Traumatología" }
    ];

    obtenerCartillaCompleta(): ResultadoCartilla {
        return {
            exito: true,
            mensaje: "Cartilla obtenida con exito.",
            datos: this.especialistasDisponibles
        };
    }

    seleccionarEspecialista(id: number): ResultadoCartilla {
        const especialista = this.especialistasDisponibles.find(e => e.id === id);
        
        if (especialista) {
            return {
                exito: true,
                mensaje: "Especialista seleccionado correctamente."
            };
        } else {
            return {
                exito: false,
                mensaje: "El especialista no esta disponible."
            };
        }
    }
}