import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
// 1. Cambiamos el import para usar TurnoService
import { TurnoService } from '../../src/Services/turno.service';

// 2. Declaramos la variable de nuestro servicio unificado
let turnoService: TurnoService;
let respuestaSistema: string | null = null;

Before(function () {
  // 3. Lo instanciamos en el Before
  turnoService = new TurnoService();
  respuestaSistema = null;
});

Given('que un usuario quiere cancelar su turno de manera online', function () {
  // 4. Cambiamos 'cancelacionService' por 'turnoService'
  turnoService.setTurnoActivo(true);
});

When('el usuario lo cancele previamente a las {int} horas de gracia', function (horasGracia: number) {
  // 5. Cambiamos 'cancelacionService' por 'turnoService'
  respuestaSistema = turnoService.cancelarTurno(48);
});

When('el usuario lo cancele', function () {
  // 6. Cambiamos 'cancelacionService' por 'turnoService'
  respuestaSistema = turnoService.cancelarTurno(10);
});

Then('aparezca un aviso de exito', function () {
  assert.strictEqual(respuestaSistema, 'Cancelación exitosa');
});

Then('el sistema le avisa que no habra reembolso de su seña.', function () {
  assert.strictEqual(respuestaSistema, 'No habrá reembolso de su seña');
});