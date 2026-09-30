import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
import { CancelacionService } from '../../src/Services/cancelacion.service';


let cancelacionService: CancelacionService;
let respuestaSistema: string | null = null;

Before(function () {
  cancelacionService = new CancelacionService();
  respuestaSistema = null;
});

Given('que un usuario quiere cancelar su turno de manera online', function () {
  // Inicializamos un turno válido para el usuario
  cancelacionService.setTurnoActivo(true);
});

// Cucumber detecta automáticamente el número '24' de tu Gherkin y lo pasa como {int}
When('el usuario lo cancele previamente a las {int} horas de gracia', function (horasGracia: number) {
  // Simulamos que el usuario cancela con 48 horas de anticipación (mayor a 24)
  respuestaSistema = cancelacionService.cancelarTurno(48);
});

When('el usuario lo cancele', function () {
  // Simulamos que el usuario cancela con solo 10 horas de anticipación (menor a 24)
  respuestaSistema = cancelacionService.cancelarTurno(10);
});

Then('aparezca un aviso de exito', function () {
  assert.strictEqual(respuestaSistema, 'Cancelación exitosa');
});

Then('el sistema le avisa que no habra reembolso de su seña.', function () {
  assert.strictEqual(respuestaSistema, 'No habrá reembolso de su seña');
});