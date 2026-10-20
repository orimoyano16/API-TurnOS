// tests/step_definitions/servicios_especialistas.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
// Importamos el servicio unificado (¡Asegúrate de que la ruta sea la correcta para tu proyecto!)
import { EspecialistaService, ResultadoEspecialista } from "../../src/Services/especialista.service.ts";

let especialistaService: EspecialistaService;
let resultado: ResultadoEspecialista;
let idEspecialistaSeleccionado: number;

// --- HAPPY PATH ---

Given('que un usuario quiere conocer la cartilla de especialistas y servicios disponibles \\(Happy path)', async function () {
    especialistaService = new EspecialistaService();
});

When('este abre el panel', async function () {
    resultado = especialistaService.obtenerCartillaCompleta();
});

Then('el sistema le muestra cada especialista y servicio disponible.', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.ok(resultado.datos !== undefined);
    assert.ok(resultado.datos.length > 0);
});

// --- ERROR PATH ---

Given('que un usuario quiere conocer los servicios y especialistas disponibles que aun no estan registrados \\(Error path)', async function () {
    especialistaService = new EspecialistaService();
    idEspecialistaSeleccionado = 99; // Simulamos un ID que no existe
});

When('este seleccione un especialista que no esta disponible', async function () {
    // Usamos el nuevo método unificado por ID
    resultado = especialistaService.seleccionarEspecialistaPorId(idEspecialistaSeleccionado);
});

Then('el sistema le avisa que no esta disponible.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "El especialista no esta disponible.");
});