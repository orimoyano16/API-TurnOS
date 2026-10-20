// servicios_especialistas.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { ServiciosEspecialistasService, ResultadoCartilla } from "../../src/Services/servicios_especialistas.service";

let cartillaService: ServiciosEspecialistasService;
let resultado: ResultadoCartilla;
let idEspecialistaSeleccionado: number;

// --- HAPPY PATH ---

Given('que un usuario quiere conocer la cartilla de especialistas y servicios disponibles \\(Happy path)', async function () {
    cartillaService = new ServiciosEspecialistasService();
});

When('este abre el panel', async function () {
    // Simulamos la acción de abrir el panel cargando la cartilla
    resultado = cartillaService.obtenerCartillaCompleta();
});

Then('el sistema le muestra cada especialista y servicio disponible.', async function () {
    assert.strictEqual(resultado.exito, true);
    // Verificamos que los datos hayan llegado y que el arreglo tenga elementos
    assert.ok(resultado.datos !== undefined);
    assert.ok(resultado.datos.length > 0);
});

// --- ERROR PATH ---

Given('que un usuario quiere conocer los servicios y especialistas disponibles que aun no estan registrados \\(Error path)', async function () {
    cartillaService = new ServiciosEspecialistasService();
    // Simulamos que el usuario intenta buscar/seleccionar el ID 99 (que no existe)
    idEspecialistaSeleccionado = 99;
});

When('este seleccione un especialista que no esta disponible', async function () {
    // Simulamos la acción de seleccionar al especialista inexistente
    resultado = cartillaService.seleccionarEspecialista(idEspecialistaSeleccionado);
});

Then('el sistema le avisa que no esta disponible.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "El especialista no esta disponible.");
});