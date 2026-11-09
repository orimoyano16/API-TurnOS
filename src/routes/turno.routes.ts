// src/routes/turno.routes.ts
import { Router } from 'express';
import { reservarTurno, cancelarTurno } from '../controllers/turno.controller';

const router = Router();

/**
 * @swagger
 * /turnos/reservar:
 *   post:
 *     summary: Reserva un nuevo turno en una fecha y hora específicas
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - hora
 *             properties:
 *               fecha:
 *                 type: string
 *                 description: Fecha del turno
 *                 example: "2026-10-20"
 *               hora:
 *                 type: string
 *                 description: Hora del turno
 *                 example: "10:00"
 *     responses:
 *       200:
 *         description: Turno reservado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva exitosa"
 *       400:
 *         description: Error al reservar el turno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "El horario seleccionado no está disponible"
 */

router.post('/reservar', reservarTurno);

/**
 * @swagger
 * /turnos/cancelar:
 *   post:
 *     summary: Cancela un turno existente
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - hora
 *               - horasAnticipacion
 *             properties:
 *               fecha:
 *                 type: string
 *                 description: Fecha del turno a cancelar
 *                 example: "2026-10-20"
 *               hora:
 *                 type: string
 *                 description: Hora del turno a cancelar
 *                 example: "10:00"
 *               horasAnticipacion:
 *                 type: integer
 *                 description: Horas de anticipación
 *                 example: 48
 *     responses:
 *       200:
 *         description: Turno cancelado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Cancelación exitosa"
 *       400:
 *         description: Error al cancelar el turno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "No hay turno registrado para cancelar"
 */

router.post('/cancelar', cancelarTurno);

export default router;