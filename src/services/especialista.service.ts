// src/services/especialista.service.ts

import { EspecialistaRepository } from '../repositories/especialista.repository';

// NOTA: Prisma genera los tipos. Puedes importar el tipo 'Especialista' directamente desde '@prisma/client'
import { Especialista } from '@prisma/client';

export interface ResultadoEspecialista {
    exito: boolean;
    mensaje: string;
    datos?: Especialista[];
}

export class EspecialistaService {
    private especialistaRepository: EspecialistaRepository;

    constructor() {
        this.especialistaRepository = new EspecialistaRepository();
    }

    async setDisponibilidad(nombre: string, disponible: boolean): Promise<void> {
        await this.especialistaRepository.guardarOActualizar(nombre, disponible);
    }
    
    async obtenerCartillaCompleta(): Promise<ResultadoEspecialista> {
        const especialistas = await this.especialistaRepository.obtenerTodos();
        return {
            exito: true,
            mensaje: "Cartilla obtenida con exito.",
            datos: especialistas
        };
    }

    async seleccionarEspecialistaPorId(id: number): Promise<ResultadoEspecialista> {
        const especialista = await this.especialistaRepository.obtenerPorId(id);
        return this.evaluarDisponibilidad(especialista ?? undefined);
    }

    // He renombrado este método a 'seleccionarEspecialista' para que coincida con la llamada en tu controlador
    async seleccionarEspecialista(nombre: string): Promise<ResultadoEspecialista> {
        const especialista = await this.especialistaRepository.obtenerPorNombre(nombre);
        return this.evaluarDisponibilidad(especialista ?? undefined);
    }

    private evaluarDisponibilidad(especialista?: Especialista): ResultadoEspecialista {
        if (especialista && especialista.disponible) {
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