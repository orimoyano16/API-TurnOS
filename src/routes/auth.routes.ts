import { Router } from 'express';
import rateLimit from 'express-rate-limit'; //[cite: 9]
import { register, login, refresh } from '../controllers/auth.controller';

const router = Router();

// Límite de peticiones: 5 intentos fallidos en 15 minutos[cite: 9]
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Demasiados intentos de inicio de sesión.' 
});

router.post('/register', register);
router.post('/login', loginLimiter, login); // Inyección del middleware de Rate Limiting
router.post('/refresh', refresh);

export default router;