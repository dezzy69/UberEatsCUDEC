document.addEventListener("DOMContentLoaded", () => {

    const menus = document.querySelectorAll('.sidenav');
    M.Sidenav.init(menus);

    cargarPlatillos();

    document.getElementById("pedidoForm")
        .addEventListener("submit", guardarPedido);

});

function cargarPlatillos() {

    db.collection("PLATILLOS").get()
        .then((snapshot) => {

            const select =
                document.getElementById("platilloSelect");

            const contenedor =
                document.getElementById("contenedorPlatillos");

            select.innerHTML =
                '<option value="" disabled selected>Selecciona un platillo</option>';

            if (contenedor) {
                contenedor.innerHTML = "";
            }

            snapshot.forEach((doc) => {

                const platillo = doc.data();

                // llenar select
                select.innerHTML += `
                    <option value="${doc.id}">
                        ${platillo.nombre}
                    </option>
                `;

                // mostrar tarjeta
                if (contenedor) {

                    contenedor.innerHTML += `
                        <div class="col s12 m6 l4">
                            <div class="card hoverable">

                                <div class="card-content">

                                    <span class="card-title">
                                        🍔 ${platillo.nombre}
                                    </span>

                                    <p>
                                        ${platillo.ingredientes}
                                    </p>

                                    <br>

                                    <h5 class="red-text">
                                        $${platillo.costo}
                                    </h5>

                                </div>

                            </div>
                        </div>
                    `;
                }

            });

            M.FormSelect.init(
                document.querySelectorAll('select')
            );

        })
        .catch((error) => {
            console.log(error);
        });
}

function guardarPedido(e) {

    e.preventDefault();

    const pedido = {

        nombreCliente:
            document.getElementById("nombre").value,

        direccion:
            document.getElementById("direccion").value,

        platilloId:
            document.getElementById("platilloSelect").value,

        cantidad:
            parseInt(document.getElementById("cantidad").value),

        fecha:
            new Date()
    };

    db.collection("PEDIDOS")
        .add(pedido)
        .then(() => {

            document.getElementById("mensaje").innerHTML =
                "✅ Pedido registrado correctamente";

            document.getElementById("pedidoForm").reset();

        })
        .catch((error) => {

            console.log(error);

            document.getElementById("mensaje").innerHTML =
                "❌ Error al guardar el pedido";
        });
}