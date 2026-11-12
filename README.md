
# API-TurnOS - Proyecto Programacion Extrema

API RESTful desarrollada en Node.js y TypeScript para la gestión de turnos, especialistas y pagos. Utiliza una arquitectura basada en capas (Controladores, Servicios y Repositorios), conectándose a una base de datos PostgreSQL persistida mediante Docker y administrada a través del ORM Prisma. Además, cuenta con un entorno de pruebas automatizadas BDD utilizando Cucumber.

# Autenticacion y Autorizacion

![alt text](imagenes/auth.png)

## 🚀 Instalación y Ejecución Local

### Requisitos Previos
Asegúrate de tener instaladas las siguientes herramientas en tu sistema:
- **Node.js** (versión LTS actual recomendada).
- **Docker y Docker Compose** (asegúrate de que el motor de Docker esté ejecutándose en tu sistema).
- **pnpm** o **npm** como gestor de paquetes.

### 1. Clonar el repositorio
```bash
git clone https://github.com/orimoyano16/API-TurnOS
cd API-TurnOS
```

### 2. Instalar dependencias
Puedes instalar las dependencias utilizando el gestor de paquetes de tu preferencia:

**Con pnpm:**
```bash
pnpm install
```

**Con npm:**
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto. Solo se requiere la clave `DATABASE_URL`, la cual debe coincidir con las credenciales configuradas en tu archivo `docker-compose.yml`:
```env
DATABASE_URL="postgresql://usuario:password123@localhost:5432/turnos_db?schema=public"
```

### 4. Levantar la base de datos
Inicia el contenedor de PostgreSQL en segundo plano utilizando Docker Compose. Abre tu terminal en la raíz del proyecto y ejecuta:
```bash
docker compose up -d
```
*(Nota: En algunas distribuciones de Linux podrías necesitar usar `sudo docker-compose up -d`).*

### 5. Aplicar migraciones del esquema
Una vez que la base de datos esté lista y corriendo, sincroniza las tablas mediante el ORM de Prisma.

**Con pnpm:**
```bash
pnpm exec prisma migrate dev
```

**Con npm:**
```bash
npx prisma migrate dev
```

### 6. Iniciar el servidor en modo desarrollo
Levanta la API utilizando el script configurado para tu entorno de desarrollo.

**Con pnpm:**
```bash
pnpm run dev
```

**Con npm:**
```bash
npm run dev
```

### 7. Ejecutar la suite de pruebas
Para correr los tests de comportamiento estructurados con Cucumber, ejecuta:

**Con pnpm:**
```bash
pnpm run test
```

**Con npm:**
```bash
npm run test
```

---

## 🛠️ Verificar el funcionamiento de la API

Una vez que el servidor esté corriendo (paso 6), puedes comprobar que todo se levantó correctamente haciendo una petición al endpoint de especialistas.

Abre tu navegador, Postman o utiliza `curl` en otra terminal para hacer una petición `GET` a la siguiente ruta (asumiendo que el servidor corre en el puerto 3000):

```bash
curl http://localhost:3000/especialistas
```

Deberías recibir un código de estado `200 OK` y una respuesta en formato JSON con la cartilla de especialistas, similar a esta:

```json
{
  "exito": true,
  "mensaje": "Cartilla obtenida con exito.",
  "datos": [
    {
      "id": 1,
      "nombre": "Dr. Perez",
      "servicio": "Cardiología",
      "disponible": true
    }
  ]
}
```
*(Nota: Si la base de datos está recién creada y vacía, el arreglo de `"datos"` aparecerá vacío `[]` hasta que ingreses información).*

# 1.1 Requisitos Funcionales
## Santiago Marranti, Oriana Moyano
### _Turnero online_ 

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

---

# 1.2 Requisitos No Funcionales

## Historias de Usuario Técnicas 

### Control de Concurrencia (evitar doble reserva)

>**Como** desarrollador de backend
<br>**Quiero** utilizar bloqueos a nivel de base de datos (o niveles de aislamiento estrictos) en el endpoint de creación de turnos
<br>**Para** evitar que dos usuarios reserven el mismo slot horario simultáneamente.

## Historias de Usuario Técnicas o restricciones del sistema relacionadas con rendimiento, seguridad o arquitectura.
>1.  **Como** auditor de seguridad,   <br>
> **Quiero** que las contraseñas de los usuarios y los datos sensibles de los pagos se almacenen mediante hashing (ej. bcrypt) <br>
> **Para** proteger la integridad y privacidad de la información en caso de una vulneración a la base de datos. <br>

