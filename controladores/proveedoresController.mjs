import * as proveedoresModel from '../models/proveedoresModel.mjs';

export const validarProveedor = (nombre, telefono, email) => {
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return 'Inserte un nombre, por favor';
    }

    if (!telefono || typeof telefono !== 'string' || telefono.trim() === '') {
        return 'Inserte un teléfono, por favor';
    }

    // Validación adicional: solo números en teléfono
    if (!/^\d+$/.test(telefono.trim())) {
        return 'El teléfono solo puede contener números';
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return 'Email inválido';
    }

    return null; // Sin errores
};


export const validarId = (id) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId <= 0) {
        return 'ID inválido. Debe ser un número entero positivo.';
    }
    return null; // ID correcto
};;

// Obtener todos los proveedores
export const getProveedores = async (req, res) => {
    try {
        const proveedores = await proveedoresModel.modelGetProveedores();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores' });
    }
};

// Obtener un proveedor por ID con validación
export const getProveedoresID = async (req, res) => {
    const error = validarId(req.params.id);
    if (error) return res.status(400).json({ message: error });

    try {
        const proveedor = await proveedoresModel.modelGetProveedoresID(req.params.id);
        if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado.' });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedor' });
    }
};


// Crear un proveedor con validaciones
export const createProveedor = async (req, res) => {
    const { nombre, telefono, email } = req.body;
    const error = validarProveedor(nombre, telefono, email);
    if (error) return res.status(400).json({ message: error });

    try {
        const proveedor = await proveedoresModel.modelCreateProveedor(nombre, telefono, email);
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proveedor' });
    }
};

// Actualizar un proveedor con validaciones
export const updateProveedor = async (req, res) => {
    const error = validarId(req.params.id);
    if (error) return res.status(400).json({ message: error });

    const { nombre, telefono, email } = req.body;
    const errorProveedor = validarProveedor(nombre, telefono, email);
    if (errorProveedor) return res.status(400).json({ message: error });

    try {
        const proveedor = await proveedoresModel.modelUpdateProveedor(req.params.id, nombre, telefono, email);
        if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado.' });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proveedor' });
    }
};


// Eliminar un proveedor con validación de ID
export const deleteProveedor = async (req, res) => {
    const error = validarId(req.params.id);
    if (error) return res.status(400).json({ message: error });

    try {
        const proveedorEliminado = await proveedoresModel.modelDeleteProveedor(req.params.id);
        if (!proveedorEliminado) {
            return res.status(404).json({ message: 'Proveedor no encontrado.' });
        }
        res.json({ message: 'Proveedor eliminado', proveedor: proveedorEliminado });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proveedor' });
    }
};
