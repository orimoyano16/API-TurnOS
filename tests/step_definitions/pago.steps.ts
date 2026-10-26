// pago.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { PagoService, ResultadoPago } from "../../src/services/pago.service";

let pagoService: PagoService;
let saldoUsuario: number;
let montoSeña: number = 1000; // Costo fijo de la seña para la prueba
let resultado: ResultadoPago;

// --- HAPPY PATH ---

Given('que un usuario quiere realizar el pago de la seña de manera online \\(Happy path)', async function () {
    pagoService = new PagoService();
    saldoUsuario = 5000; // Simulamos un usuario con saldo suficiente
});

When('este selecciona su metodo de pago, se procesa el pago', async function () {
    // Procesamos el pago asumiendo que eligió tarjeta de crédito
    resultado = pagoService.procesarPago("Tarjeta de Credito", saldoUsuario, montoSeña);
});

Then('el sistema le devuelve que su turno ha sido agendado de manera correcta.', async function () {
    assert.strictEqual(resultado.exito, true);
    assert.strictEqual(resultado.mensaje, "su turno ha sido agendado de manera correcta.");
});


// --- ERROR PATH ---

Given('que un usuario quiere realizar el pago de la seña de manera online \\(Error path)', async function () {
    pagoService = new PagoService();
    saldoUsuario = 200; // Simulamos un usuario con saldo INSUFICIENTE (menor a 1000)
});

When('el pago no pudo ser procesado por saldo insuficiente', async function () {
    // El proceso de intentar pagar es el mismo, pero el servicio detectará la falta de saldo
    resultado = pagoService.procesarPago("Tarjeta de Debito", saldoUsuario, montoSeña);
});

Then('el sistema le devuelve que el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion.', async function () {
    assert.strictEqual(resultado.exito, false);
    assert.strictEqual(resultado.mensaje, "el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion.");
});