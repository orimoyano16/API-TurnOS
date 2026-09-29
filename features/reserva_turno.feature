# language: es
Característica: Reserva de turnos online
  Como usuario de una página web
  Quiero poder agendar turnos online a cierto horario y fecha
  Para asegurar mi atención sin necesidad de llamar por teléfono

  Escenario: Agendar un turno en un horario disponible (Happy path)
    Dado que el horario de las "10:00" el día "2026-10-20" está disponible
    Cuando el usuario solicita reservar el turno a las "10:00" el día "2026-10-20"
    Entonces el sistema debe devolver un mensaje de éxito
    Y el horario de las "10:00" el día "2026-10-20" debe quedar registrado como ocupado

  Escenario: Intentar agendar en un horario ocupado (Error path)
    Dado que el horario de las "10:00" el día "2026-10-20" ya se encuentra ocupado
    Cuando el usuario solicita reservar el turno a las "10:00" el día "2026-10-20"
    Entonces el sistema debe devolver un error indicando que el horario está ocupado