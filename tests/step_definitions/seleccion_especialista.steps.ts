import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { EspecialistaService, ResultadoEspecialista } from "../../src/services/especialista.service.js";

let especialistaService: EspecialistaService;
let resultado: ResultadoEspecialista;

Given('que el especialista {string} tiene disponibilidad en su agenda', async function (nombreDoctor: string) {
    especialistaService = new EspecialistaService();
    await especialistaService.setDisponibilidad(nombreDoctor, true);
});

Given('que el especialista {string} no tiene disponibilidad en su agenda', async function (nombreDoctor: string) {
    especialistaService = new EspecialistaService();
    await especialistaService.setDisponibilidad(nombreDoctor, false);
});

When('el usuario selecciona al {string} para su consulta', async function (nombreDoctor: string) {
    resultado = await especialistaService.seleccionarEspecialista(nombreDoctor); // Usamos el nombre actualizado del método
});

When('el usuario selecciona a la {string} para su consulta', async function (nombreDoctora: string) {
    resultado = await especialistaService.seleccionarEspecialista(nombreDoctora);
});

Then('el sistema confirma la asignación del especialista', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.strictEqual(resultado.mensaje, "Especialista seleccionado correctamente.");
});

Then('el sistema notifica que el especialista no está disponible', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "El especialista no esta disponible.");
});