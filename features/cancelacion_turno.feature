# language: es
Característica: Cancelacion de turno
Como usuario de una pagina web,
Quiero poder cancelar un turno de manera online,
Para no tener que ir personalmente o avisar por mensaje.

 Escenario: Turno cancelado exitosamente (Happy path)
           Dado que un usuario quiere cancelar su turno de manera online
           Cuando el usuario lo cancele previamente a las 24 horas de gracia
           Entonces aparezca un aviso de exito


  Escenario: No hay reembolso (Error path)
           Dado que un usuario quiere cancelar su turno de manera online
           Cuando el usuario lo cancele
           Entonces el sistema le avisa que no habra reembolso de su seña.