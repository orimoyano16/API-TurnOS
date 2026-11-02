// src/controllers/especialista.controller.ts

import { Request, Response } from 'express';
import { EspecialistaService } from '../services/especialista.service';

const especialistaService = new EspecialistaService();

export const obtenerCartilla = async (req: Request, res: Response) => {
    try {
        const resultado = await especialistaService.obtenerCartillaCompleta();
        res.status(200).json(resultado);
    } catch (error: any) {
        res.status(500).json({ exito: false, mensaje: error.message });
    }
};

export const seleccionarEspecialistaPorNombre = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ exito: false, mensaje: "Debe proporcionar el nombre del especialista." });
        }

        const resultado = await especialistaService.seleccionarEspecialista(nombre);
        
        if (resultado.exito) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json(resultado);
        }
    } catch (error: any) {
        res.status(500).json({ exito: false, mensaje: error.message });
    }
};

export const seleccionarEspecialistaPorId = async (req: Request, res: Response) => {
    try {
        // En este caso tomamos el ID desde los parámetros de la URL (ej: /especialistas/1)
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido." });
        }

        const resultado = await especialistaService.seleccionarEspecialistaPorId(id);
        
        if (resultado.exito) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json(resultado);
        }
    } catch (error: any) {
        res.status(500).json({ exito: false, mensaje: error.message });
    }
};