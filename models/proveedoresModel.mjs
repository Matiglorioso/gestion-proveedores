import pool from '../conexiones/db.mjs';

export const modelGetProveedores = async () => {
    const result = await pool.query('SELECT * FROM proveedores');
    return result.rows;
};

export const modelGetProveedoresID = async (id) => {
    const result = await pool.query('SELECT * FROM proveedores WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const modelCreateProveedor = async (nombre, telefono, email) => {
    const result = await pool.query(
        'INSERT INTO proveedores (nombre, telefono, email) VALUES ($1, $2, $3) RETURNING *',
        [nombre, telefono, email]
    );
    return result.rows[0];
};

export const modelUpdateProveedor = async (id, nombre, telefono, email) => {
    const result = await pool.query(
        'UPDATE proveedores SET nombre=$1, telefono=$2, email=$3 WHERE id=$4 RETURNING *',
        [nombre, telefono, email, id]
    );
    return result.rows[0] || null;
};

export const modelDeleteProveedor = async (id) => {
    const result = await pool.query('DELETE FROM proveedores WHERE id=$1 RETURNING *', [id]);
    return result.rows[0] || null;
};
