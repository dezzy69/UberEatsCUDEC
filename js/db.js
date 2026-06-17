db.collection("PLATILLOS").onSnapshot((coleccion) => {
    coleccion.docChanges().forEach((registro) => {
        if (registro.type === "added")
        {
            mostrarplatillo(registro.doc.data(), registro.doc.id);
        }
        if (registro.type === "modified")
        {
            actualizarplatillo(registro.doc.data(), registro.doc.id);
        }
        if (registro.type === "removed")
        {
            eliminarPlatillo(registro.doc.id);
        }
    })});


    const formularioAgregar = document.querySelector("form");
  formularioAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    const platilloNuevo = {
      nombre: formularioAgregar.title.value,
      ingredientes: formularioAgregar.ingredients.value,
      costo: formularioAgregar.cost.value
    }
    db.collection("PLATILLOS").add(platilloNuevo)
    .catch((error) => {
        console.log(error);
        alert("Error al agregar el platillo");
    });
    formularioAgregar.title.value = "";
    formularioAgregar.ingredients.value = "";
    formularioAgregar.cost.value = "";
    alert("Platillo agregado exitosamente");
  });

  const eliminarPlatillo = document.querySelector(".recipes");
    eliminarPlatillo.addEventListener("click", (e) => {
        if (e.target.tagName === 'I') {
            const id = e.target.getAttribute("data-id");
            db.collection("PLATILLOS").doc(id).delete()
        }
})