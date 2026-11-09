// src/routes/especialista.routes.ts

import { Router } from 'express';
import { 
    obtenerCartilla, 
    seleccionarEspecialistaPorNombre, 
    seleccionarEspecialistaPorId 
} from '../controllers/especialista.controller';

const router = Router();

/**
 * @swagger
 * /especialistas:
 *   get:
 *     summary: Obtiene la cartilla completa de especialistas
 *     tags: [Especialistas]
 *     responses:
 *       200:
 *         description: Lista de especialistas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito:
 *                   type: boolean
 *                 mensaje:
 *                   type: string
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       servicio:
 *                         type: string
 *                       disponible:
 *                         type: boolean
 */
router.get('/', obtenerCartilla);

/**
 * @swagger
 * /especialistas/seleccionar:
 *   post:
 *     summary: Selecciona y verifica la disponibilidad de un especialista por su nombre
 *     tags: [Especialistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre exacto del especialista
 *                 example: "Dr. Perez"
 *     responses:
 *       200:
 *         description: Especialista seleccionado correctamente y disponible
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
 *                   example: "Especialista seleccionado correctamente."
 *       400:
 *         description: Error en la petición (falta el nombre)
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
 *                   example: "Debe proporcionar el nombre del especialista."
 *       404:
 *         description: El especialista no existe o no está disponible
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
 *                   example: "El especialista no esta disponible."
 */
router.post('/seleccionar', seleccionarEspecialistaPorNombre);

/**
 * @swagger
 * /especialistas/{id}:
 *   get:
 *     summary: Selecciona y verifica la disponibilidad de un especialista por su ID
 *     tags: [Especialistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del especialista
 *         example: 1
 *     responses:
 *       200:
 *         description: Especialista encontrado y disponible
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
 *                   example: "Especialista seleccionado correctamente."
 *       400:
 *         description: ID proporcionado no válido
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
 *                   example: "El ID proporcionado no es válido."
 *       404:
 *         description: El especialista no existe o no está disponible
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
 *                   example: "El especialista no esta disponible."
 */
router.get('/:id', seleccionarEspecialistaPorId);

export default router;