// src/Services/especialista.service.ts

import { EspecialistaRepository, Especialista } from '../Repositories/especialista.repository';

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

    // ==========================================
    // MÉTODO PARA PREPARAR TESTS (Given)
    // ==========================================
    setDisponibilidad(nombre: string, disponible: boolean): void {
        this.especialistaRepository.guardarOActualizar(nombre, disponible);
    }

    // ==========================================
    // MÉTODOS DE NEGOCIO (When)
    // ==========================================
    
    obtenerCartillaCompleta(): ResultadoEspecialista {
        return {
            exito: true,
            mensaje: "Cartilla obtenida con exito.",
            datos: this.especialistaRepository.obtenerTodos()
        };
    }

    seleccionarEspecialistaPorId(id: number): ResultadoEspecialista {
        const especialista = this.especialistaRepository.obtenerPorId(id);
        return this.evaluarDisponibilidad(especialista);
    }

    seleccionarEspecialistaPorNombre(nombre: string): ResultadoEspecialista {
        const especialista = this.especialistaRepository.obtenerPorNombre(nombre);
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
            return {
                exito: false,
                mensaje: "El especialista no esta disponible."
            };
        }
    }
}