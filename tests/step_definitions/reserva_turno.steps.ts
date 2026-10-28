import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
import { TurnoService } from '../../src/services/turno.service';

let turnoService: TurnoService;
let respuestaSistema: string | null = null;
let errorSistema: string | null = null;

Before(function () {
  turnoService = new TurnoService();
  respuestaSistema = null;
  errorSistema = null;
});

Given('que el horario de las {string} el día {string} está disponible', async function (hora: string, fecha: string) {
  await turnoService.setEstadoAgenda(fecha, hora, 'disponible');
});

Given('que el horario de las {string} el día {string} ya se encuentra ocupado', async function (hora: string, fecha: string) {
  await turnoService.setEstadoAgenda(fecha, hora, 'ocupado');
});

When('el usuario solicita reservar el turno a las {string} el día {string}', async function (hora: string, fecha: string) {
  try {
    respuestaSistema = await turnoService.reservarTurno(fecha, hora);
  } catch (error: any) {
    errorSistema = error.message;
  }
});

Then('el sistema debe devolver un mensaje de éxito', async function () {
  assert.strictEqual(respuestaSistema, 'Reserva exitosa');
});

Then('el horario de las {string} el día {string} debe quedar registrado como ocupado', async function (hora: string, fecha: string) {
  const estadoActual = await turnoService.getEstadoTurno(fecha, hora);
  assert.strictEqual(estadoActual, 'ocupado');
});

Then('el sistema debe devolver un error indicando que el horario está ocupado', async function () {
  assert.strictEqual(errorSistema, 'El horario seleccionado no está disponible');
});