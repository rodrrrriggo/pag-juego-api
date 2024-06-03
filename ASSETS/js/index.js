import { getJuegos } from "./peticion/getJuegos.js";

const enviarDatos = (id , imagen, nombre , precio , desarrollador) => {

    const archivoHTML = "./JUEGOS.HTML";

    fetch(archivoHTML)
        .then(response => response.text())
        .then( ( html )=> {


            const parser = new DOMParser();
            const doc = parser.parseFromString(html,"text/html");

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = imagen;
            imagePage.alt = `Imagen de ${nombre}`;
            imagePage.classList.add("card-img-top");

            const titlePage = doc.getElementById("titlePage");
            titlePage.textContent = `Nombre : ${nombre}`;

            const subTitlePage = doc.getElementById("subTitlePage");
            subTitlePage.textContent = `Desarrollador : ${desarrollador}`;

            const subTitlePage2 = doc.getElementById("subTitlePage2");
            subTitlePage2.textContent = `precio : ${precio}`

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;

        })


}

const crearCards = ( juegos = [] ) => {

    let juegosRow = document.getElementById("juegosRow");

    juegos.map((jueguito) => {
        const { id , imagen, nombre , precio , desarrollador} = jueguito;


        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3");
        divCol.classList.add("col-lg-3");
        divCol.classList.add("col-md-3");
        divCol.classList.add("col-sm-12");
        divCol.classList.add("col-xs-12");
        divCol.classList.add("mt-2");
        divCol.classList.add("mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src= imagen;
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
        btnVer.classList.add("btn","btn-success");
        btnVer.textContent = "Ver más";
        btnVer.addEventListener("click", ()=> {
            enviarDatos(id , imagen, nombre , precio , desarrollador);
        });

        divCol.appendChild(card);

        card.appendChild(img);
        card.appendChild(divBody);

        divBody.appendChild(title);
        divBody.appendChild(subTitle);
        divBody.appendChild(subTitle2);
        divBody.appendChild(btnVer);

        juegosRow.appendChild(divCol);
    })
}
getJuegos()
    .then( data => crearCards(data))
    .catch( error => console.log(`El error es: ${error}`))