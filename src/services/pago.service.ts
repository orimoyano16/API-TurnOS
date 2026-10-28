// src/services/pago.service.ts

import { PagoRepository } from '../repositories/pago.repository';

export interface ResultadoPago {
    exito: boolean;
    mensaje: string;
}

export class PagoService {
    private pagoRepository: PagoRepository;

    constructor() {
        this.pagoRepository = new PagoRepository();
    }

    async procesarPago(metodoPago: string, saldoDisponible: number, montoSeña: number): Promise<ResultadoPago> {
        const pagoAprobado = saldoDisponible >= montoSeña;
        
        // El ID y la fecha ya no se generan aquí porque Prisma lo hace automáticamente
        await this.pagoRepository.guardarTransaccion({
            metodoPago: metodoPago,
            monto: montoSeña,
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