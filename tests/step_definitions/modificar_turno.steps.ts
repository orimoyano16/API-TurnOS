import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { TurnoService, ResultadoModificacion } from "../../src/services/turno.service.js";

let turnoService: TurnoService;
let horasAnticipacion: number;
let resultado: ResultadoModificacion;

Given('que un usuario se equivoco de dia que saco su turno \\(Happy path)', async function () {
    turnoService = new TurnoService();
    horasAnticipacion = 48; 
});

Given('que un usuario se equivoco de dia que saco su turno \\(Error path)', async function () {
    turnoService = new TurnoService();
    horasAnticipacion = 10; 
});

When('quiere modificarlo', async function () {
    // Este método sigue siendo síncrono en tu servicio, por lo que no requiere await
    resultado = turnoService.modificarTurno(horasAnticipacion);
});

Then('el sistema, si esta dentro del lapso aceptado, le dara mensaje de exito.', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.strictEqual(resultado.mensaje, "Modificacion exitosa.");
});

Then('el sistema no dejara modificarlo.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "No se puede modificar, faltan menos de 24 horas.");
});