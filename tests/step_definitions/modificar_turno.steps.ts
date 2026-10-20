// modificar_turno.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { ModificarTurnoService, ResultadoModificacion } from "../../src/Services/modificar_turno.service"

let modificarTurnoService: ModificarTurnoService;
let horasAnticipacion: number;
let resultado: ResultadoModificacion;

// --- HAPPY PATH ---

Given('que un usuario se equivoco de dia que saco su turno \\(Happy path)', async function () {
    modificarTurnoService = new ModificarTurnoService();
    // Simulamos que el usuario pide la modificación con 48 horas de anticipación (lapso aceptado)
    horasAnticipacion = 48; 
});

// --- ERROR PATH ---

Given('que un usuario se equivoco de dia que saco su turno \\(Error path)', async function () {
    modificarTurnoService = new ModificarTurnoService();
    // Simulamos que el usuario pide la modificación con 10 horas de anticipación (fuera del lapso)
    horasAnticipacion = 10; 
});

// --- ACCIÓN COMPARTIDA (WHEN) ---

// Este paso es idéntico en ambos escenarios del .feature, por lo que Cucumber 
// ejecutará esta misma función para los dos caminos.
When('quiere modificarlo', async function () {
    resultado = modificarTurnoService.modificarTurno(horasAnticipacion);
});

// --- RESULTADOS (THEN) ---

Then('el sistema, si esta dentro del lapso aceptado, le dara mensaje de exito.', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.strictEqual(resultado.mensaje, "Modificacion exitosa.");
});

Then('el sistema no dejara modificarlo.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "No se puede modificar, faltan menos de 24 horas.");
});