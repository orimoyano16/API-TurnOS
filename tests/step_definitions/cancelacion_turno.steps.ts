import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
import { TurnoService } from '../../src/services/turno.service';

let turnoService: TurnoService;
let respuestaSistema: string | null = null;

// Creamos un ID de prueba estándar para el test
const TURNO_ID_PRUEBA = '2026-10-20 10:00'; 

Before(function () {
  turnoService = new TurnoService();
  respuestaSistema = null;
});

Given('que un usuario quiere cancelar su turno de manera online', async function () {
  // Primero creamos el turno en la DB para que pueda ser cancelado
  await turnoService.setEstadoAgenda('2026-10-20', '10:00', 'ocupado');
  await turnoService.setTurnoActivo(TURNO_ID_PRUEBA, true);
});

When('el usuario lo cancele previamente a las {int} horas de gracia', async function (horasGracia: number) {
  respuestaSistema = await turnoService.cancelarTurno(TURNO_ID_PRUEBA, 48); // 48 hrs de anticipación
});

When('el usuario lo cancele', async function () {
  respuestaSistema = await turnoService.cancelarTurno(TURNO_ID_PRUEBA, 10); // 10 hrs de anticipación
});

Then('aparezca un aviso de exito', async function () {
  assert.strictEqual(respuestaSistema, 'Cancelación exitosa');
});

Then('el sistema le avisa que no habra reembolso de su seña.', async function () {
  assert.strictEqual(respuestaSistema, 'No habrá reembolso de su seña');
});