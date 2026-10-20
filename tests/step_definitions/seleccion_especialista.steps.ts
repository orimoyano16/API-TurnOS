// tests/step_definitions/seleccion_especialista.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { EspecialistaService, ResultadoEspecialista } from "../../src/Services/especialista.service.ts";

let especialistaService: EspecialistaService;
let resultado: ResultadoEspecialista;

// ==========================================
// GIVEN (Configurar el estado inicial)
// ==========================================

Given('que el especialista {string} tiene disponibilidad en su agenda', async function (nombreDoctor: string) {
    especialistaService = new EspecialistaService();
    // Usamos el método que creamos en el servicio para forzar que esté disponible (true)
    especialistaService.setDisponibilidad(nombreDoctor, true);
});

Given('que el especialista {string} no tiene disponibilidad en su agenda', async function (nombreDoctor: string) {
    especialistaService = new EspecialistaService();
    // Usamos el método para forzar que NO esté disponible (false)
    especialistaService.setDisponibilidad(nombreDoctor, false);
});


// ==========================================
// WHEN (La acción del usuario)
// ==========================================

// Para cuando el feature dice "al 'Dr. Marranti'"
When('el usuario selecciona al {string} para su consulta', async function (nombreDoctor: string) {
    resultado = especialistaService.seleccionarEspecialistaPorNombre(nombreDoctor);
});

// Para cuando el feature dice "a la 'Dra. Moyano'"
When('el usuario selecciona a la {string} para su consulta', async function (nombreDoctora: string) {
    resultado = especialistaService.seleccionarEspecialistaPorNombre(nombreDoctora);
});


// ==========================================
// THEN (Verificar el resultado)
// ==========================================

Then('el sistema confirma la asignación del especialista', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.strictEqual(resultado.mensaje, "Especialista seleccionado correctamente.");
});

Then('el sistema notifica que el especialista no está disponible', async function () {
    assert.strictEqual(resultado.exito, false);
    // Nota: fíjate que acá no uso tilde en "esta" porque así lo armamos en el servicio
    assert.strictEqual(resultado.mensaje, "El especialista no esta disponible.");
});