// src/Services/pago.service.ts

import { PagoRepository } from '../Repositories/pago.repository';

export interface ResultadoPago {
    exito: boolean;
    mensaje: string;
}

export class PagoService {
    private pagoRepository: PagoRepository;

    constructor() {
        this.pagoRepository = new PagoRepository();
    }

    procesarPago(metodoPago: string, saldoDisponible: number, montoSeña: number): ResultadoPago {
        const pagoAprobado = saldoDisponible >= montoSeña;
        
        // Guardamos el registro en la capa de datos
        this.pagoRepository.guardarTransaccion({
            id: Math.random().toString(36).substr(2, 9), // Generamos un ID aleatorio simulado
            metodoPago: metodoPago,
            monto: montoSeña,
            fecha: new Date(),
            estado: pagoAprobado ? 'aprobado' : 'rechazado'
        });

        if (pagoAprobado) {
            return {
                exito: true,
                mensaje: "su turno ha sido agendado de manera correcta."
            };
        } else {
            return {
                exito: false,
                mensaje: "el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion."
            };
        }
    }
}