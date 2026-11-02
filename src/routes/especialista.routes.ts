// src/routes/especialista.routes.ts

import { Router } from 'express';
import { 
    obtenerCartilla, 
    seleccionarEspecialistaPorNombre, 
    seleccionarEspecialistaPorId 
} from '../controllers/especialista.controller';

const router = Router();

// Endpoint para obtener todos los especialistas
// GET /especialistas
router.get('/', obtenerCartilla);

// Endpoint para seleccionar por nombre (espera { "nombre": "Dr. Perez" } en el body)
// POST /especialistas/seleccionar
router.post('/seleccionar', seleccionarEspecialistaPorNombre);

// Endpoint para seleccionar por ID (el ID viaja en la URL)
// GET /especialistas/1
router.get('/:id', seleccionarEspecialistaPorId);

export default router;