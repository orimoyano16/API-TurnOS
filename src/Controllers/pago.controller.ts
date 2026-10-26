import { Request, Response } from 'express';
import { PagoService } from '../Services/pago.service';

const pagoService = new PagoService();

export const procesarPago = (req: Request, res: Response) => {
    try {
        const { metodoPago, saldoDisponible, montoSeña } = req.body;
        
        // Llamamos al servicio con los datos que envía el usuario desde la web/Postman
        const resultado = pagoService.procesarPago(metodoPago, saldoDisponible, montoSeña);
        
        if (resultado.exito) {
            res.status(200).json(resultado);
        } else {
            res.status(400).json(resultado);
        }
    } catch (error: any) {
        res.status(500).json({ exito: false, mensaje: error.message });
    }
};