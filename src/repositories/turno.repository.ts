// src/repositories/turno.repository.ts
import { prisma } from '../db/prisma';

export class TurnoRepository {
    async guardarTurno(turnoId: string, estado: string): Promise<void> {
        await prisma.turno.upsert({
            where: { id: turnoId },
            update: { estado },
            create: {
                id: turnoId,
                estado: estado,
                activo: true
            }
        });
    }

    async obtenerTurno(turnoId: string): Promise<string> {
        const turno = await prisma.turno.findUnique({
            where: { id: turnoId }
        });
        return turno?.estado || 'disponible';
    }

    async setTurnoActivo(turnoId: string, estadoActivo: boolean): Promise<void> {
        await prisma.turno.update({
            where: { id: turnoId },
            data: { activo: estadoActivo }
        });
    }

    async getTurnoActivo(turnoId: string): Promise<boolean> {
        const turno = await prisma.turno.findUnique({
            where: { id: turnoId }
        });
        return turno?.activo || false;
    }
}