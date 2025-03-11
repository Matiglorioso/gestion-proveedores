// functions.js
// ES Modules - funciones CRUD Proveedores con fetch

const API_URL = "http://localhost:3000/api/proveedores";

// Obtener todos los proveedores (GET)
export async function cargarProveedores() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener proveedores");
  }
  return await response.json();
}

// Agregar proveedor (POST)
export async function agregarProveedor(datos) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const errorMsg = await response.json();
    throw new Error(errorMsg.message || "Error al agregar proveedor");
  }

  return response.json();
}

// Editar proveedor por ID (PUT)
export async function editarProveedor(id, datos) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const errorMsg = await response.json();
    throw new Error(errorMsg.message || "Error al editar proveedor");
  }

  return await response.json();
}

// Eliminar proveedor por ID (DELETE)
export async function eliminarProveedor(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    const errorMsg = await response.json();
    throw new Error(errorMsg.message || "Error al eliminar proveedor");
  }

  return await response.json();
}

// Consultar proveedor por ID (GET)
export async function consultarProveedorPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorMsg = await response.json();
    throw new Error(errorMsg.message || "Error al consultar proveedor");
  }

  return await response.json();
}
