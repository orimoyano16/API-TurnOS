// src/repositories/especialista.repository.ts
import { prisma } from '../db/prisma';

export class EspecialistaRepository {
    async obtenerTodos() {
        return await prisma.especialista.findMany();
    }

    async obtenerPorId(id: number) {
        return await prisma.especialista.findUnique({
            where: { id }
        });
    }

    async obtenerPorNombre(nombre: string) {
        return await prisma.especialista.findUnique({
            where: { nombre }
        });
    }

    async guardarOActualizar(nombre: string, disponible: boolean): Promise<void> {
        await prisma.especialista.upsert({
            where: { nombre },
            update: { disponible },
            create: {
                nombre: nombre,
                servicio: "General",
                disponible: disponible
            }
        });
    }
}