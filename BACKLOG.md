# Backlog del Producto - API-TurnOS

## Historias de Usuario Funcionales

> **HU 01: Reserva de Turno**
> **Como** usuario de una página web,
> **Quiero** poder agendar turnos online a cierto horario y fecha,
> **Para** asegurar mi atención sin necesidad de llamar por teléfono ni asistir presencialmente.
> * **Criterio de Aceptación 1:** Si el usuario selecciona un horario disponible, el sistema confirma la reserva con un mensaje de éxito y marca el horario como ocupado.
> * **Criterio de Aceptación 2:** Si el usuario intenta agendar en un horario ocupado, el sistema devuelve un error indicando la indisponibilidad.

> **HU 02: Selección de Especialista**
> **Como** usuario de una página web,
> **Quiero** poder elegir quién me va a atender el día de la consulta,
> **Para** asegurarme que sea el especialista adecuado.
> * **Criterio de Aceptación 1:** Si el especialista seleccionado tiene agenda disponible, el sistema confirma la asignación.
> * **Criterio de Aceptación 2:** Si el especialista no está disponible, el sistema notifica la indisponibilidad.

> **HU 03: Cancelación de Turno**
> **Como** usuario de una página web,
> **Quiero** poder cancelar un turno de manera online,
> **Para** no tener que ir personalmente o avisar por mensaje.
> * **Criterio de Aceptación 1:** Si el usuario cancela con 24 horas o más de anticipación, el sistema procesa la cancelación con éxito.
> * **Criterio de Aceptación 2:** Si el usuario cancela con menos de 24 horas, el sistema avisa que la cancelación no tiene reembolso de seña.

> **HU 04: Pago Online**
> **Como** usuario de una página web,
> **Quiero** poder pagar mi reserva de manera online,
> **Para** agilizar el proceso y tener más métodos de pago.

> **HU 05: Modificación de Turno**
> **Como** usuario de una página web,
> **Quiero** poder modificar los datos de mi turno 24 horas previas antes de la fecha,
> **Para** evitar una cancelación o arrepentimiento del mismo.

> **HU 06: Cartilla de Servicios**
> **Como** usuario de una página web,
> **Quiero** poder ver la cartilla de especialistas y servicios disponibles,
> **Para** asegurarme de una atención adecuada de acuerdo a mi necesidad.

---

## Historias de Usuario No Funcionales (Técnicas)

> **HU 07: Rendimiento de la API**
> **Como** administrador de infraestructura,
> **Quiero** que los endpoints críticos de la API (como reserva y cancelación) respondan en menos de 300ms,
> **Para** garantizar una experiencia de usuario fluida y evitar dobles reservas por latencia.

> **HU 08: Seguridad de Datos**
> **Como** auditor de seguridad,
> **Quiero** que las contraseñas de los usuarios y los datos sensibles se almacenen mediante hashing (ej. bcrypt),
> **Para** proteger la integridad y privacidad de la información ante una potencial brecha.