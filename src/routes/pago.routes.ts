import { Router } from 'express';
import { procesarPago } from '../controllers/pago.controller'; // <-- Nueva importación

const router = Router();

/**
 * @swagger
 * /pagos/procesar:
 *   post:
 *     summary: Procesa el pago de la seña para agendar el turno
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - metodoPago
 *               - saldoDisponible
 *               - montoSeña
 *             properties:
 *               metodoPago:
 *                 type: string
 *                 description: Método de pago seleccionado
 *                 example: "Tarjeta de Credito"
 *               saldoDisponible:
 *                 type: number
 *                 description: Saldo disponible en la cuenta del usuario
 *                 example: 5000
 *               montoSeña:
 *                 type: number
 *                 description: Monto requerido para confirmar el turno
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Pago procesado y turno agendado correctamente
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
 *                   example: "su turno ha sido agendado de manera correcta."
 *       400:
 *         description: Error al procesar el pago por saldo insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion."
 */

// <-- Nuevo endpoint para pagos
router.post('/procesar', procesarPago); 

export default router;