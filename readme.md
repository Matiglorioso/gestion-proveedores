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

## 🗃️ Configuración de la base de datos

**Crea la base de datos en PostgreSQL:**

```sql
CREATE DATABASE nombre_base;
```

**Crea la tabla proveedores:**

```sql
CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

### 📌 Archivo `.env`

Crea un archivo `.env` con tus datos de conexión:

```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=tu_basedatos
DB_PASSWORD=tu_password
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

## 📂 Estructura del proyecto

```
FinalAW2-Aliaga/
├── conexiones/
│   ├── crearBD.mjs
│   └── db.mjs
├── controladores/
│   └── proveedoresController.mjs
├── models/
│   └── proveedoresModel.mjs
├── public/
│   ├── index.html
│   ├── index.css
│   ├── index.js
│   └── functions.js
├── routes/
│   ├── proveedores.mjs
│   └── proveedoresFront.mjs
├── app.mjs
├── .env
├── package.json
└── package-lock.json
```

## 📚 Recomendaciones adicionales
- Verifica siempre que PostgreSQL esté corriendo correctamente.
- Prueba los endpoints con Postman para verificar que todo funcione antes de entregar.

## 🎓 Autor

**Tu Nombre Completo**

📧 **tuemail@example.com**

