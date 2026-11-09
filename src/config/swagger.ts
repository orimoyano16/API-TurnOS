// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API-TurnOS',
            version: '1.0.0',
            description: 'API para gestión de turnos médicos y especialistas',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1', // Cambia el puerto si usas otro
                description: 'Servidor Local',
            },
        ],
    },
    // Le indicamos a Swagger dónde buscar los comentarios de documentación
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);