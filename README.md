# API-TurnOS

## Historias de Usuarios
---

> 1. **Como** usuario de una pagina web, <br>
> **Quiero** poder agendar turnos online a cierto horario y fecha, <br>
> **Para** asegurar mi atención sin necesidad de llamar por teléfono ni asistir presencialmente.

> 2. **Como** usuario de una pagina web, <br>
> **Quiero** poder elegir quien me va a atender el dia de la consulta, <br>
> **Para** asegurarme que sea el especialista adecuado.

> 3. **Como** usuario de una pagina web, <br>
> **Quiero** poder cancelar un turno de manera online, <br>
> **Para** no tener que ir personalmente o avisar por mensaje.

> 4. **Como** usuario de una pagina web, <br>
> **Quiero** poder pagar mi reserva de manera online, <br>
> **Para** agilizar el proceso y tener mas metodos de pago.

> 5. **Como** usuario de una pagina web, <br>
> **Quiero** poder modificar los datos de mi turno 24 horas previas antes de la fecha, <br>
> **Para** evitar una cancelacion o arrepentimiento del mismo.

> 6. **Como** usuario de una pagina web, <br>
> **Quiero** poder ver la cartilla de especialistas y servicios disponibles, <br>
> **Para** asegurarme de una atencion adecuada de acuerdo a mi necesidad.

## Criterios de aceptacion
---

> 1. a) Happy path: <br>
> **GIVEN** que un usuario quiere registrar su turno a cierto horario y fecha <br>
> **WHEN** este selecciona el horario y fecha adecuada <br>
> **THEN** el sistema le devuelve un mensaje de exito. <br>
> b) Error path:<br>
> **GIVEN** que un usuario quiera registrar su turno a cierto horario y fecha <br>
> **WHEN** este selecciona el horario y fecha requerida <br>
> **THEN** el sistema le devuelve que ese horario esta ocupado.

> 2. a) Happy path: <br>
> **GIVEN** que un usuario quiere elegir su especialista <br>
> **WHEN** este lo seleccione <br>
> **THEN** el sistema le devuelve especialista disponible. <br>
> b) Error path:<br>
> **GIVEN** que un usuario quiere elegir su especialista <br>
> **WHEN** este lo seleccione  <br>
> **THEN** el sistema le devuelve que el especialista no esta disponible.

> 3. a) Happy path: <br>
> **GIVEN** que un usuario quiere cancelar su turno de manera online <br>
> **WHEN** el usuario lo cancele previamente a las 24 horas de gracia<br>
> **THEN** aparezca un aviso de exito <br>
> b) Error path:<br>
> **GIVEN** que un usuario quiere cancelar su turno de manera online <br>
> **WHEN** el usuario lo cancele <br>
> **THEN** el sistema le avisa que no habra reembolso de su seña.

> 4. a) Happy path: <br>
> **GIVEN** que un usuario quiere realizar el pago de la seña de manera online<br>
> **WHEN** este selecciona su metodo de pago, se procesa el pago  <br>
> **THEN** el sistema le devuelve que su turno ha sido agendado de manera correcta<br>
> b) Error path:<br>
> **GIVEN** que un usuario quiere realizar el pago de la seña de manera online<br>
> **WHEN** el pago no pudo ser procesado por saldo insuficiente <br>
> **THEN** el sistema le devuelve que el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion. 

> 5. a) Happy path: <br>
> **GIVEN** un usuario se equivoco de dia que saco su turno <br>
> **WHEN** quiere modificarlo <br>
> **THEN** el sistema, si esta dentro del lapso aceptado, le dara mensaje de exito.<br>
> b) Error path:<br>
> **GIVEN** un usuario se equivoco de dia que saco su turno<br>
> **WHEN** quiere modificarlo <br>
> **THEN** el sistema no dejara modificarlo.

> 6. a) Happy path: <br>
> **GIVEN** que un usuario quiere conocer la cartilla de especialistas y servicios disponibles <br>
> **WHEN** este abre el panel <br>
> **THEN** el sistema le muestra cada especialista y servicio disponible<br>
> b) Error path:<br>
> **GIVEN** que un usuario quiere conocer los servicios y especialistas disponibles que aun no estan registrados <br>
> **WHEN** este seleccione un especialista que no esta disponible <br>
> **THEN** el sistema le avisa que no esta disponible.

