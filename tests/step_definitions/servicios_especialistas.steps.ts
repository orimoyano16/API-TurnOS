import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { EspecialistaService, ResultadoEspecialista } from "../../src/services/especialista.service.js";

let especialistaService: EspecialistaService;
let resultado: ResultadoEspecialista;
let idEspecialistaSeleccionado: number;

Given('que un usuario quiere conocer la cartilla de especialistas y servicios disponibles \\(Happy path)', async function () {
    especialistaService = new EspecialistaService();
});

When('este abre el panel', async function () {
    resultado = await especialistaService.obtenerCartillaCompleta();
});

Then('el sistema le muestra cada especialista y servicio disponible.', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.ok(resultado.datos !== undefined);
    assert.ok(resultado.datos.length > 0);
});

Given('que un usuario quiere conocer los servicios y especialistas disponibles que aun no estan registrados \\(Error path)', async function () {
    especialistaService = new EspecialistaService();
    idEspecialistaSeleccionado = 9999; // Usamos un ID muy alto para asegurar que no exista
});

When('este seleccione un especialista que no esta disponible', async function () {
    resultado = await especialistaService.seleccionarEspecialistaPorId(idEspecialistaSeleccionado);
});

Then('el sistema le avisa que no esta disponible.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "El especialista no esta disponible.");
});