# 📌 Proyecto Gestión de Proveedores

Este proyecto es una aplicación web que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos de proveedores utilizando Node.js, Express, PostgreSQL y JavaScript con ES Modules.

## 📋 Tecnologías utilizadas

- Node.js (Express)
- PostgreSQL
- JavaScript (ES Modules)
- HTML, CSS, Bootstrap

## 🔧 Instalación del proyecto

Clona el repositorio y entra en la carpeta:

```bash
git clone <url-del-repositorio>
cd FinalAW2-Aliaga
```

Instala las dependencias necesarias:

```bash
npm install express cors pg dotenv
```

## 🗃️ Instalación de PostgreSQL en Windows

1. Descarga PostgreSQL desde [postgresql.org](https://www.postgresql.org/download/windows/).
2. Instala PostgreSQL y asegúrate de recordar el usuario y la contraseña que configures.
3. Abre **pgAdmin** o usa la terminal `psql` para conectarte a PostgreSQL.
4. Verifica que PostgreSQL esté corriendo usando:
   ```bash
   net start postgresql
   ```

## 🗃️ Configuración de la base de datos

### **Crear la base de datos**

Abre `psql` y ejecuta:

```sql
CREATE DATABASE proveedores_db;
```

### **Crear la tabla de proveedores**

```sql
CREATE TABLE IF NOT EXISTS proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
```

### 📌 Archivo `.env`

Crea un archivo `.env` con tus datos de conexión:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_NAME=proveedores_db
DB_PORT=5432
PORT=3000
```

## 🚀 Ejecución

Para ejecutar tu servidor, utiliza:

```bash
node app.mjs
```

Luego abre tu navegador en:

```
http://localhost:3000
```

## 📌 Endpoints API REST disponibles

| Método HTTP | URL                    | Descripción                     |
|-------------|------------------------|----------------------------------|
| GET         | `/api/proveedores`     | Obtener todos los proveedores    |
| GET         | `/api/proveedores/:id` | Obtener un proveedor por ID      |
| POST        | `/api/proveedores`     | Crear un proveedor nuevo         |
| PUT         | `/api/proveedores/:id` | Actualizar datos del proveedor   |
| DELETE      | `/api/proveedores/:id` | Eliminar un proveedor existente  |

## 📚 Recomendaciones adicionales
- Verifica siempre que PostgreSQL esté corriendo correctamente.
- Prueba los endpoints con Postman para verificar que todo funcione antes de entregar.

## 🎓 Autor

**Matias Aliaga**

📧 **matiasaliaga1918@hotmail.com**
