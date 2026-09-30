import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
import { EspecialistaService } from '../../src/Services/especialista.service';


let especialistaService:EspecialistaService ;
let respuestaSistema: string | null = null;

Before(function () {
  especialistaService = new EspecialistaService();
  respuestaSistema = null;
});

Given('que el especialista {string} tiene disponibilidad en su agenda', function (nombre: string) {
  especialistaService.setDisponibilidad(nombre, true);
});

Given('que el especialista {string} no tiene disponibilidad en su agenda', function (nombre: string) {
  especialistaService.setDisponibilidad(nombre, false);
});

When('el usuario selecciona al {string} para su consulta', function (nombre: string) {
  try {
    respuestaSistema = especialistaService.seleccionarEspecialista(nombre);
  } catch (error: any) {
    respuestaSistema = error.message;
  }
});

Then('el sistema confirma la asignación del especialista', function () {
  assert.strictEqual(respuestaSistema, 'Especialista asignado correctamente');
});

Then('el sistema notifica que el especialista no está disponible', function () {
  assert.strictEqual(respuestaSistema, 'El especialista seleccionado no está disponible');
});