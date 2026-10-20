// pago.service.ts

export interface ResultadoPago {
    exito: boolean;
    mensaje: string;
}

export class PagoService {
    procesarPago(metodoPago: string, saldoDisponible: number, montoSeña: number): ResultadoPago {
        if (saldoDisponible >= montoSeña) {
            return {
                exito: true,
                mensaje: "su turno ha sido agendado de manera correcta."
            };
        } else {
            return {
                exito: false,
                mensaje: "el turno no se registro correctamente y que debe probar con otro metodo de pago para completar la transaccion."
            };
        }
    }
}