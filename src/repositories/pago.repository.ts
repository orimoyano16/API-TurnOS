// src/Repositories/pago.repository.ts

export interface Transaccion {
    id: string;
    metodoPago: string;
    monto: number;
    fecha: Date;
    estado: 'aprobado' | 'rechazado';
}

export class PagoRepository {
    // Aquí guardaremos el historial de todos los intentos de pago
    private historialPagos: Transaccion[] = [];

    guardarTransaccion(transaccion: Transaccion): void {
        this.historialPagos.push(transaccion);
    }

    obtenerHistorial(): Transaccion[] {
        return this.historialPagos;
    }
}