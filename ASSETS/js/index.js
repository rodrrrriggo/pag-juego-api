import { getJuegos } from "./peticion/getJuegos.js";

let carrito = [];

const agregarAlCarrito = (juego) => {
  const existe = carrito.find(item => item.id === juego.id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...juego, cantidad: 1 });
  }
  actualizarCarrito();
}

const actualizarCarrito = () => {
  const carritoItems = document.getElementById("carritoItems");
  const totalCarrito = document.getElementById("totalCarrito");
  carritoItems.innerHTML = "";

  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });

    li.appendChild(btnEliminar);
    carritoItems.appendChild(li);

    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = total.toFixed(2);
}

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  const comprarButton = document.querySelector('.modal-footer .btn-primary');
  comprarButton.addEventListener('click', () => {
    alert('¡Gracias por comprar, disfruta tus videojuegos!');
    carrito = [];
    actualizarCarrito();
  });
});


const enviarDatos = (id, imagen, nombre, precio, desarrollador) => {
  const archivoHTML = "./JUEGOS.HTML";

  fetch(archivoHTML)
    .then(response => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const imagePage = doc.getElementById("imagePage");
      imagePage.src = imagen;
      imagePage.alt = `Imagen de ${nombre}`;
      imagePage.classList.add("card-img-top");

      const titlePage = doc.getElementById("titlePage");
      titlePage.textContent = `Nombre : ${nombre}`;

      const subTitlePage = doc.getElementById("subTitlePage");
      subTitlePage.textContent = `Desarrollador : ${desarrollador}`;

      const subTitlePage2 = doc.getElementById("subTitlePage2");
      subTitlePage2.textContent = `Precio : ${precio}`;

      const nuevoHTML = new XMLSerializer().serializeToString(doc);

      document.body.innerHTML = nuevoHTML;
    })
}

const crearCards = (juegos = []) => {
  let juegosRow = document.getElementById("juegosRow");

  juegos.forEach((jueguito) => {
    const { id, imagen, nombre, precio, desarrollador } = jueguito;

    const divCol = document.createElement("div");
    divCol.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = imagen;
    img.alt = `Imagen de ${id}`;
    img.classList.add("card-img-top");

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("text-title");
    title.textContent = `Nombre : ${nombre}`;

    const subTitle = document.createElement("p");
    subTitle.classList.add("text-title");
    subTitle.textContent = `Desarrollador : ${desarrollador}`;

    const subTitle2 = document.createElement("p");
    subTitle2.classList.add("text-title");
    subTitle2.textContent = `Precio : ${precio}`;

    const btnVer = document.createElement("button");
    btnVer.classList.add("btn", "btn-success");
    btnVer.textContent = "Ver más";
    btnVer.addEventListener("click", () => {
      enviarDatos(id, imagen, nombre, precio, desarrollador);
    });

    const btnAgregar = document.createElement("button");
    btnAgregar.classList.add("btn", "btn-primary", "ms-2");
    btnAgregar.textContent = "Agregar al carrito";
    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(jueguito);
    });

    divCol.appendChild(card);
    card.appendChild(img);
    card.appendChild(divBody);
    divBody.appendChild(title);
    divBody.appendChild(subTitle);
    divBody.appendChild(subTitle2);
    divBody.appendChild(btnVer);
    divBody.appendChild(btnAgregar);

    juegosRow.appendChild(divCol);
  });
}

getJuegos()
  .then(data => crearCards(data))
  .catch(error => console.log(`El error es: ${error}`));
