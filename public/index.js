import {
    cargarProveedores,
    agregarProveedor,
    editarProveedor,
    eliminarProveedor
  } from './functions.js';
  
  function mostrarNotificacion(titulo, mensaje, aceptar = null, cancelar = null) {
    const modalElement = document.getElementById('modalNotificacion');
    document.getElementById('modalNotificacionTitulo').textContent = titulo;
    document.getElementById('modalNotificacionMensaje').textContent = mensaje;
  
    const modal = new bootstrap.Modal(modalElement);
    const botonAceptar = modalElement.querySelector('.btn-aceptar');
    const botonCancelar = modalElement.querySelector('.btn-cancelar');
  
    botonAceptar.replaceWith(botonAceptar.cloneNode(true));
    botonCancelar.replaceWith(botonCancelar.cloneNode(true));
  
    modalElement.querySelector('.btn-aceptar').onclick = () => {
      modal.hide();
      if (aceptar) aceptar();
    };
  
    modalElement.querySelector('.btn-cancelar').onclick = () => {
      modal.hide();
      if (cancelar) cancelar();
    };
  
    modal.show();
  }
  
  async function cargarProv() {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
  
    try {
      const proveedores = await cargarProveedores();
      const container = document.getElementById("proveedoresContainer");
      container.innerHTML = "";
  
      proveedores.forEach(prov => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${prov.id}</td>
          <td>${prov.nombre}</td>
          <td>${prov.telefono}</td>
          <td>${prov.email}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1 btnEditar">Editar</button>
            <button class="btn btn-danger btn-sm btnEliminar">Eliminar</button>
          </td>
        `;
  
        // Botón editar
        tr.querySelector(".btnEditar").onclick = () => {
          document.getElementById("nombreEditar").value = prov.nombre;
          document.getElementById("telefonoEditar").value = prov.telefono;
          document.getElementById("emailEditar").value = prov.email;
          document.getElementById("proveedorEditarForm").dataset.id = prov.id;
          new bootstrap.Modal(document.getElementById("modalEditarProveedor")).show();
        };
  
        // Botón eliminar
        tr.querySelector(".btnEliminar").onclick = () => {
          mostrarNotificacion(
            "Eliminar proveedor",
            `¿Deseas eliminar al proveedor "${prov.nombre}"?`,
            async () => {
              try {
                await eliminarProveedor(prov.id);
                mostrarNotificacion("ACCIÓN COMPLETADA", "Proveedor eliminado correctamente.");
                await cargarProv();
              } catch (error) {
                mostrarNotificacion("Error", error.message);
              }
            }
          );
        };
  
        container.appendChild(tr);
      });
  
    } catch (error) {
      mostrarNotificacion("Error", error.message);
    } finally {
      spinner.classList.add('d-none');
    }
  }
  
  // Evento formulario "Crear Proveedor"
  document.getElementById("proveedorForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
  
    if (!nombre || !telefono || !email) {
      mostrarNotificacion("Validación", "Todos los campos son obligatorios.");
      return;
    }
  
    try {
      await agregarProveedor({ nombre, telefono, email });
      mostrarNotificacion("ACCIÓN COMPLETADA", "Proveedor agregado correctamente.");
      e.target.reset();
      bootstrap.Modal.getInstance(document.getElementById("modalCrearProveedor")).hide();
      await cargarProv();
    } catch (error) {
      const errMessage = await error;
      mostrarNotificacion("Error", errMessage.message || "Hubo un error al agregar proveedor.");
    }
  });
  
  // Evento formulario "Editar Proveedor"
  document.getElementById("proveedorEditarForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = e.target.dataset.id;
    const nombre = document.getElementById("nombreEditar").value.trim();
    const telefono = document.getElementById("telefonoEditar").value.trim();
    const email = document.getElementById("emailEditar").value.trim();
  
    if (!nombre || !telefono || !email) {
      mostrarNotificacion("Validación", "Todos los campos son obligatorios.");
      return;
    }
  
    try {
      await editarProveedor(id, { nombre, telefono, email });
      mostrarNotificacion("ACCIÓN COMPLETADA", "Proveedor actualizado correctamente.");
      e.target.reset();
      bootstrap.Modal.getInstance(document.getElementById("modalEditarProveedor")).hide();
      await cargarProv();
    } catch (error) {
      const errMessage = await error;
      mostrarNotificacion("Error", errMessage.message || "Hubo un error al editar proveedor.");
    }
  });
  
  // Cargar proveedores al iniciar
  document.addEventListener("DOMContentLoaded", cargarProv);
  
  // Validar que el teléfono solo acepte números
  document.querySelectorAll('input[id^="telefono"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '');
    });
  });
  document.getElementById("filtroProveedores").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll("#proveedoresContainer tr");

    filas.forEach(fila => {
        const id = fila.children[0].textContent.toLowerCase();
        const nombre = fila.children[1].textContent.toLowerCase();

        // Mostrar solo las filas que coincidan con la búsqueda
        if (id.includes(filtro) || nombre.includes(filtro)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
});

  