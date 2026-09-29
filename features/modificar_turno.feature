# language: es
Característica: Modificacion de Turnos
    Como usuario de una pagina web,
    Quiero poder modificar los datos de mi turno 24 horas previas antes de la fecha,
    Para evitar una cancelacion o arrepentimiento del mismo.

    Escenario:
        Dado que un usuario se equivoco de dia que saco su turno (Happy path)
        Cuando quiere modificarlo
        Entonces el sistema, si esta dentro del lapso aceptado, le dara mensaje de exito.
    Escenario:
        Dado que un usuario se equivoco de dia que saco su turno (Error path)
        Cuando quiere modificarlo
        Entonces el sistema no dejara modificarlo.