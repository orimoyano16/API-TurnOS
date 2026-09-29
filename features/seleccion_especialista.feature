# language: es
Característica: Elección de especialista
  Como usuario de una página web
  Quiero poder elegir quién me va a atender el día de la consulta
  Para asegurarme de que sea el especialista adecuado

  Escenario: Especialista disponible seleccionado exitosamente (Happy path)
    Dado que el especialista "Dr. Marranti" tiene disponibilidad en su agenda
    Cuando el usuario selecciona al "Dr. Marranti" para su consulta
    Entonces el sistema confirma la asignación del especialista
    
  Escenario: Especialista sin disponibilidad (Error path)
    Dado que el especialista "Dra. Moyano" no tiene disponibilidad en su agenda
    Cuando el usuario selecciona a la "Dra. Moyano" para su consulta
    Entonces el sistema notifica que el especialista no está disponible