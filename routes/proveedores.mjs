import express from 'express';
import { getProveedores, getProveedoresID, createProveedor, updateProveedor, deleteProveedor } from '../controladores/proveedoresController.mjs';

const router = express.Router();

router.get('/proveedores', getProveedores);
router.get('/proveedores/:id', getProveedoresID);
router.post('/proveedores', createProveedor);
router.put('/proveedores/:id', updateProveedor);
router.delete('/proveedores/:id', deleteProveedor);

export default router;
