import { Router } from 'express';
import { getSolicitudes, insertSolicitud, insertarRespuesta } from '../controllers/adminController.ts';

const adminRouter = Router();

adminRouter.get('/solicitudes', getSolicitudes);
adminRouter.post('/solicitudes', insertSolicitud);
adminRouter.post('/respuestas', insertarRespuesta);

export default adminRouter;
