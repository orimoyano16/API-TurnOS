import express from 'express';
import cors from 'cors';
import { reservarTurno, cancelarTurno, seleccionarEspecialista } from './Controllers/turno.controller';

const app = express();
const PORT = 3000;

// Middlewares requeridos para procesar JSON
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TurnOS - Proyecto Programación Extrema');
});
// Definición de Rutas (Endpoints REST)
app.post('/api/turnos/reservar', reservarTurno);
app.post('/api/turnos/cancelar', cancelarTurno);
app.post('/api/especialistas/seleccionar', seleccionarEspecialista);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(` Backend de API-TurnOS corriendo en http://localhost:${PORT}`);
  console.log(`Integrantes: Santiago Marranti y Oriana Moyano`);
});