// src/index.ts
import express from 'express';
import cors from 'cors';
import turnoRoutes from './routes/turno.routes';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TurnOS - Proyecto Programación Extrema');
});

// Inyectamos las rutas de la API
app.use('/api', turnoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend de API-TurnOS corriendo en http://localhost:${PORT}`);
  console.log(`Integrantes: Santiago Marranti y Oriana Moyano`);
});