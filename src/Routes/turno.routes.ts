// src/routes/turno.routes.ts
import { Router } from 'express';
import { reservarTurno, seleccionarEspecialista, cancelarTurno } from '../Controllers/turno.controller';
import { procesarPago } from '../Controllers/pago.controller'; // <-- Nueva importación

const router = Router();

router.post('/turnos/reservar', reservarTurno);
router.post('/turnos/cancelar', cancelarTurno);
router.post('/especialistas/seleccionar', seleccionarEspecialista);

// <-- Nuevo endpoint para pagos
router.post('/pagos/procesar', procesarPago); 

export default router;