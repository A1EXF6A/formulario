import type { Request, Response } from 'express';
import SolicitudCambio from '../models/admin.ts';
import RespuestaCambio from '../models/respuesta.ts';

export const getSolicitudes = async (req: Request, res: Response) => {
    try {
        const solicitudes = await SolicitudCambio.findAll();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const insertSolicitud = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const solicitud = await SolicitudCambio.create(body);
        res.json(solicitud);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const insertarRespuesta = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        console.log(body);
        const solicitud = await RespuestaCambio.create(body);
        res.json(solicitud);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}