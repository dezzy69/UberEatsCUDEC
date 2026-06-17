document.addEventListener('DOMContentLoaded', function () {
  // Menú derecho
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });

  // Formulario lateral izquierdo
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

// Mostrar platillo
function mostrarplatillo(platillo, id) {
  const contenido = `
    <div class="card-panel recipe white row" id="${id}" data-id="${id}">
      <div class="recipe-details">
        <div class="recipe-title">
          ${platillo.nombre}
        </div>

        <div class="recipe-ingredients">
          ${platillo.ingredientes}
        </div>

        <div class="recipe-cost">
          $${platillo.costo}
        </div>
      </div>

      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">
          delete_outline
        </i>
      </div>
    </div>
  `;

  document.querySelector('.recipes').innerHTML += contenido;
}

// Actualizar platillo
function actualizarplatillo(platillo, id) {
  const tarjeta = document.querySelector(`.recipe[data-id="${id}"]`);

  if (!tarjeta) return;

  tarjeta.querySelector('.recipe-title').textContent =
    platillo.nombre;

  tarjeta.querySelector('.recipe-ingredients').textContent =
    platillo.ingredientes;

  tarjeta.querySelector('.recipe-cost').textContent =
    `$${platillo.costo}`;
}

// Eliminar platillo
function borrarPlatillo(id) {
  const platillo = document.querySelector(`.recipe[data-id="${id}"]`);

  if (platillo) {
    platillo.remove();
  }
}