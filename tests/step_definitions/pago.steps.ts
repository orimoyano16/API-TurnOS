import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { PagoService, ResultadoPago } from "../../src/services/pago.service";

let pagoService: PagoService;
let saldoUsuario: number;
let montoSeña: number = 1000;
let resultado: ResultadoPago;

Given('que un usuario quiere realizar el pago de la seña de manera online \\(Happy path)', async function () {
    pagoService = new PagoService();
    saldoUsuario = 5000; 
});

When('este selecciona su metodo de pago, se procesa el pago', async function () {
    resultado = await pagoService.procesarPago("Tarjeta de Credito", saldoUsuario, montoSeña);
});

Then('el sistema le devuelve que su turno ha sido agendado de manera correcta.', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.strictEqual(resultado.mensaje, "su turno ha sido agendado de manera correcta.");
});

Given('que un usuario quiere realizar el pago de la seña de manera online \\(Error path)', async function () {
    pagoService = new PagoService();
    saldoUsuario = 200; 
});

When('el pago no pudo ser procesado por saldo insuficiente', async function () {
    resultado = await pagoService.procesarPago("Tarjeta de Debito", saldoUsuario, montoSeña);
});

Then('el sistema le devuelve que el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion.");
});