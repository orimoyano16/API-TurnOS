import { Given, When, Then } from "@cucumber/cucumber";

Given("Que un usuario quiere realizar el pago de la seña de manera online", async function () {
    throw new Error("PENDIENTE: Configurar estado inicial para el pago online.");
});

When("Este selecciona su metodo de pago, se procesa el pago", async function () {
    throw new Error("PENDIENTE: Implementar metodos de pago.");
});

Then("El sistema le devuelve que su turno ha sido agendado de manera correcta.", async function () {
    throw new Error("PENDIENTE: Implementar mensaje de que el turno se agendo porque realizo el pago.");
});

When("el pago no pudo ser procesado por saldo insuficiente.", async function () {
    throw new Error("PENDIENTE: Procesar el pago, debe dar saldo insuficiente.");
});

Then("El sistema le devuelve que el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion. ", async function () {
    throw new Error("PENDIENTE: Implementar mensaje de que el turno no se agendo porque realizo el pago y tenia saldo insuficiente.");
});