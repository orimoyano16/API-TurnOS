// modificar_turno.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
// 1. Cambiamos ModificarTurnoService por TurnoService y agregamos .ts al final
import { TurnoService, ResultadoModificacion } from "../../src/Services/turno.service.ts";

// 2. Usamos TurnoService
let turnoService: TurnoService;
let horasAnticipacion: number;
let resultado: ResultadoModificacion;

// --- HAPPY PATH ---

Given('que un usuario se equivoco de dia que saco su turno \\(Happy path)', async function () {
    // 3. Instanciamos TurnoService
    turnoService = new TurnoService();
    // Simulamos que el usuario pide la modificación con 48 horas de anticipación (lapso aceptado)
    horasAnticipacion = 48; 
});

// --- ERROR PATH ---

Given('que un usuario se equivoco de dia que saco su turno \\(Error path)', async function () {
    // 4. Instanciamos TurnoService
    turnoService = new TurnoService();
    // Simulamos que el usuario pide la modificación con 10 horas de anticipación (fuera del lapso)
    horasAnticipacion = 10; 
});

// --- ACCIÓN COMPARTIDA (WHEN) ---

When('quiere modificarlo', async function () {
    // 5. Llamamos al método desde turnoService
    resultado = turnoService.modificarTurno(horasAnticipacion);
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