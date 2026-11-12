// src/index.ts
import express from 'express';
import cors from 'cors';

import turnoRoutes from './routes/turno.routes';
import especialistaRoutes from './routes/especialista.routes';
import pagosRoutes from './routes/pago.routes';
import authRoutes from './routes/auth.routes';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();
const PORT = 3000;

// 1. Definimos las opciones de CORS
const corsOptions = {
  // Solo permitimos peticiones desde la URL de backend local
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
  // Permite que el frontend envíe el token de autorización en los headers
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TurnOS - Proyecto Programación Extrema');
});

// Inyectamos las rutas de la API
app.use('/api/v1/turnos', turnoRoutes);

app.use('/api/v1/especialistas', especialistaRoutes);

app.use('/api/v1/pagos', pagosRoutes)

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Autorizacion y Autenticacion
app.use('/api/v1/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend de API-TurnOS corriendo en http://localhost:${PORT}`);
  console.log(`Integrantes: Santiago Marranti y Oriana Moyano`);
});