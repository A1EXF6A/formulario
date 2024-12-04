import express from 'express';
import adminRouter from './routes/adminRoutes.ts';
import base from './config/database.ts';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', adminRouter);

base.authenticate().then(() => {
    console.log('Conexión a la base establecida correctamente.');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log('Error en la conexión: ', error);
})