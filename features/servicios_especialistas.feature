# language: es
Característica: Cartilla de especialistas y servicios disponibles
    Como usuario de una pagina web,
    Quiero poder ver la cartilla de especialistas y servicios disponibles,
    Para asegurarme de una atencion adecuada de acuerdo a mi necesidad.

    Escenario:
        Dado que un usuario quiere conocer la cartilla de especialistas y servicios disponibles (Happy path)
        Cuando este abre el panel 
        Entonces el sistema le muestra cada especialista y servicio disponible.
    
    Escenario
        Dado que un usuario quiere conocer los servicios y especialistas disponibles que aun no estan registrados (Error path)
        Cuando este seleccione un especialista que no esta disponible
        Entonces el sistema le avisa que no esta disponible.