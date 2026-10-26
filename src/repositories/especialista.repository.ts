// src/Repositories/especialista.repository.ts

export interface Especialista {
    id: number;
    nombre: string;
    servicio: string;
    disponible: boolean;
}

export class EspecialistaRepository {
    // La base de datos ahora vive exclusivamente en el Repositorio
    private especialistas: Especialista[] = [
        { id: 1, nombre: "Dr. Perez", servicio: "Cardiología", disponible: true },
        { id: 2, nombre: "Dra. Gomez", servicio: "Dermatología", disponible: true },
        { id: 3, nombre: "Dr. Lopez", servicio: "Traumatología", disponible: true },
        { id: 4, nombre: "Dra. Moyano", servicio: "Pediatría", disponible: false }
    ];

    obtenerTodos(): Especialista[] {
        return this.especialistas;
    }

    obtenerPorId(id: number): Especialista | undefined {
        return this.especialistas.find(e => e.id === id);
    }

    obtenerPorNombre(nombre: string): Especialista | undefined {
        return this.especialistas.find(e => e.nombre === nombre);
    }

    guardarOActualizar(nombre: string, disponible: boolean): void {
        const especialista = this.obtenerPorNombre(nombre);
        if (especialista) {
            especialista.disponible = disponible;
        } else {
            this.especialistas.push({
                id: this.especialistas.length + 1,
                nombre: nombre,
                servicio: "General",
                disponible: disponible
            });
        }
    }
}