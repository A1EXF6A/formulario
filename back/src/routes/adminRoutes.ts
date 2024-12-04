import { Router } from 'express';
import { getSolicitudes, insertSolicitud } from '../controllers/adminController.ts';

const adminRouter = Router();

adminRouter.get('/solicitudes', getSolicitudes);
adminRouter.post('/solicitudes', insertSolicitud);

export default adminRouter;
