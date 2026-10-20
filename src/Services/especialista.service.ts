export interface Especialista {
    id: number;
    nombre: string;
    servicio: string;
    disponible: boolean; // Agregamos la disponibilidad al objeto
}

export interface ResultadoEspecialista {
    exito: boolean;
    mensaje: string;
    datos?: Especialista[];
}

export class EspecialistaService {
    // Base de datos unificada
    private especialistas: Especialista[] = [
        { id: 1, nombre: "Dr. Perez", servicio: "Cardiología", disponible: true },
        { id: 2, nombre: "Dra. Gomez", servicio: "Dermatología", disponible: true },
        { id: 3, nombre: "Dr. Lopez", servicio: "Traumatología", disponible: true },
        // Ya dejamos preparada a la Dra. Moyano sin disponibilidad para tu test de error:
        { id: 4, nombre: "Dra. Moyano", servicio: "Pediatría", disponible: false } 
    ];

    // ==========================================
    // MÉTODO PARA PREPARAR TESTS (Given)
    // ==========================================
    setDisponibilidad(nombre: string, disponible: boolean): void {
        const especialista = this.especialistas.find(e => e.nombre === nombre);
        if (especialista) {
            especialista.disponible = disponible;
        } else {
            // Si el test pide un médico que no existe, lo agregamos temporalmente
            this.especialistas.push({
                id: this.especialistas.length + 1,
                nombre: nombre,
                servicio: "General",
                disponible: disponible
            });
        }
    }

    // ==========================================
    // MÉTODOS DE NEGOCIO (When)
    // ==========================================
    
    obtenerCartillaCompleta(): ResultadoEspecialista {
        return {
            exito: true,
            mensaje: "Cartilla obtenida con exito.",
            datos: this.especialistas
        };
    }

    // Permite seleccionar por ID (Para la vista de cartilla)
    seleccionarEspecialistaPorId(id: number): ResultadoEspecialista {
        const especialista = this.especialistas.find(e => e.id === id);
        return this.evaluarDisponibilidad(especialista);
    }

    // Permite seleccionar por Nombre (Para tu test de "Dra. Moyano")
    seleccionarEspecialistaPorNombre(nombre: string): ResultadoEspecialista {
        const especialista = this.especialistas.find(e => e.nombre === nombre);
        return this.evaluarDisponibilidad(especialista);
    }

    // Lógica interna compartida para no repetir código
    private evaluarDisponibilidad(especialista?: Especialista): ResultadoEspecialista {
        if (especialista && especialista.disponible) {
            return {
                exito: true,
                mensaje: "Especialista seleccionado correctamente."
            };
        } else {
            // En lugar de hacer "throw new Error", devolvemos un objeto. 
            // Esto es mucho más fácil de testear en Cucumber con assert.strictEqual()
            return {
                exito: false,
                mensaje: "El especialista no esta disponible."
            };
        }
    }
}