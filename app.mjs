import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import proveedoresRoutes from './routes/proveedores.mjs';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', proveedoresRoutes);
app.use('/', express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
