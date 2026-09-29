# language: es
Característica: Pago de turno online
    Como usuario de una pagina web,
    Quiero poder pagar mi reserva de manera online, 
    Para agilizar el proceso y tener mas metodos de pago.

    Escenario:
        Dado que un usuario quiere realizar el pago de la seña de manera online (Happy path)
        Cuando este selecciona su metodo de pago, se procesa el pago
        Entonces el sistema le devuelve que su turno ha sido agendado de manera correcta.
    Escenario:
        Dado que un usuario quiere realizar el pago de la seña de manera online (Error path)
        Cuando el pago no pudo ser procesado por saldo insuficiente
        Entonces el sistema le devuelve que el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion. 
