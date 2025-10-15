function generarLista(arrayPersonajes) {
    let listaHTML = "";
    for (let i = 0; i < arrayPersonajes.length; i++) {
        let id = arrayPersonajes[i]._id;
        let nombre = arrayPersonajes[i].name || "Sin nombre";
        let imagen = arrayPersonajes[i].imageUrl || "https://via.placeholder.com/100x100?text=No+Image";

        listaHTML += `
        <div class="c-lista-pokemon personaje-${id}" onclick="Personaje('${id}')">
            <p>ID: ${id}</p>
            <img src="${imagen}" width="auto" height="80" loading="lazy" alt="${nombre}">
            <p>${nombre}</p>
        </div>`;
    }

    return listaHTML;
}

function buscadorfuncion(sza) {
    if (sza.length >= 3) {
        const filtrados = [];
        for (let i = 0; i < personajes.length; i++) {
            const nombre = (personajes[i].name || "").toLowerCase();
            if (nombre.includes(sza.toLowerCase())) {
                filtrados.push(personajes[i]);
            }
        }
        let listaHTML = generarLista(filtrados);
        document.getElementById("la-lista").innerHTML = listaHTML;
    } else {
        let listaHTML = generarLista(personajes);
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}

function Home() {

    // limpiar root
    document.getElementById("root").innerHTML = ``;

    // 🔹 Buscador (colocado en el header junto al nav)
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar personaje...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    const searchContainer = document.getElementById("search-container");
    if (searchContainer) {
        searchContainer.innerHTML = "";
        searchContainer.appendChild(buscador);
    } else {
        // preferimos insertar el buscador dentro del nav si existe, para posicionarlo al lado del menú
        const nav = document.querySelector('nav');
        if (nav) {
            // crear wrapper para permitir estilo y posicionamiento
            const wrapper = document.createElement('div');
            wrapper.classList.add('nav-search');
            wrapper.appendChild(buscador);
            nav.appendChild(wrapper);
        } else {
            // si no hay nav, añadir en root como fallback
            document.getElementById("root").appendChild(buscador);
        }
    }

    // 🔹 Contenedor de la lista (cards grid)
    const listaHTML = generarLista(personajes);
    const contenedorChars = document.createElement("section");
    contenedorChars.id = "la-lista";
    contenedorChars.classList.add("lista-cards");
    contenedorChars.innerHTML = listaHTML;

    // 🔹 Agregar al DOM (lista de personajes abajo)
    document.getElementById("root").appendChild(contenedorChars);
}
