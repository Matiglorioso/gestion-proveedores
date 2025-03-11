import pool from './db.mjs';

const setupDataBase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS proveedores (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                telefono VARCHAR(20) NOT NULL,
                email VARCHAR(100) NOT NULL
            );
        `);
        console.log("✅ Tabla 'proveedores' verificada.");

        const result = await pool.query("SELECT COUNT(*) FROM proveedores;");
        if (parseInt(result.rows[0].count) === 0) {
            await pool.query(`
                INSERT INTO proveedores (nombre, telefono, email) VALUES
                ('Proveedor 1', '123456789', 'proveedor1@email.com'),
                ('Proveedor 2', '987654321', 'proveedor2@email.com');
            `);
            console.log("✅ Datos de prueba insertados en 'proveedores'.");
        } else {
            console.log("ℹ️ La tabla 'proveedores' ya tiene datos.");
        }
    } catch (error) {
        console.error("❌ Error configurando la base de datos:", error);
    }
};

export default setupDataBase;
