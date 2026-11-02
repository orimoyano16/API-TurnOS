// src/repositories/pago.repository.ts
import { prisma } from '../db/prisma';

export interface TransaccionDTO {
    metodoPago: string;
    monto: number;
    estado: string;
}

export class PagoRepository {
    async guardarTransaccion(transaccion: TransaccionDTO): Promise<void> {
        await prisma.pago.create({
            data: transaccion // El ID y la fecha los genera Prisma por defecto
        });
    }

    async obtenerHistorial() {
        return await prisma.pago.findMany({
            orderBy: { fecha: 'desc' }
        });
    }
}