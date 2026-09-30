import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
import { TurnoService } from '../../src/Services/turno.service';



let turnoService:TurnoService;
let respuestaSistema: string | null = null;
let errorSistema: string | null = null;

// Before: Se ejecuta antes de cada escenario para limpiar el estado
Before(function () {
  turnoService = new TurnoService();
  respuestaSistema = null;
  errorSistema = null;
});

Given('que el horario de las {string} el día {string} está disponible', function (hora: string, fecha: string) {
  turnoService.setEstadoAgenda(fecha, hora, 'disponible');
});

Given('que el horario de las {string} el día {string} ya se encuentra ocupado', function (hora: string, fecha: string) {
  turnoService.setEstadoAgenda(fecha, hora, 'ocupado');
});

When('el usuario solicita reservar el turno a las {string} el día {string}', function (hora: string, fecha: string) {
  try {
    respuestaSistema = turnoService.reservarTurno(fecha, hora);
  } catch (error: any) {
    errorSistema = error.message;
  }
});

Then('el sistema debe devolver un mensaje de éxito', function () {
  assert.strictEqual(respuestaSistema, 'Reserva exitosa');
});

Then('el horario de las {string} el día {string} debe quedar registrado como ocupado', function (hora: string, fecha: string) {
  assert.strictEqual(turnoService.getEstadoTurno(fecha, hora), 'ocupado');
});

Then('el sistema debe devolver un error indicando que el horario está ocupado', function () {
  assert.strictEqual(errorSistema, 'El horario seleccionado no está disponible');
});