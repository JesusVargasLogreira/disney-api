var esFavorito = false;

function toggleFavorito(paramid, paramname, paramimg) {
    // Leer favoritos actuales desde localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = false;

    // Verificar si ya está guardado
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === paramid) {
            existe = true;
            break;
        }
    }

    if (existe == true) {
        // Eliminar si ya estaba
        favoritos = favoritos.filter(char => char.id !== paramid);
        esFavorito = false;
    } else {
        // Si no está, agregarlo
        favoritos.push({
            id: paramid,
            name: paramname,
            image: paramimg,
            url: `https://api.disneyapi.dev/character/${paramid}`
        });
        esFavorito = true;
    }

    // Guardar el array actualizado en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar el icono en pantalla
    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

async function Personaje(id) {
    var root = document.getElementById("root");

    // Obtener datos del personaje
    const res = await fetch(`https://api.disneyapi.dev/character/${id}`);
    const data = await res.json();
    const personaje = data.data;

    // Revisar si este personaje ya está en favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(char => char.id === id || char._id === id);


    // Preparar textos
    let peliculas = personaje.films?.length ? personaje.films.join(", ") : "Ninguna";
    let series = personaje.tvShows?.length ? personaje.tvShows.join(", ") : "Ninguna";
    let atracciones = personaje.parkAttractions?.length ? personaje.parkAttractions.join(", ") : "Ninguna";

    // Mostrar detalle del personaje (sin botón volver)
    root.innerHTML = `
    <section class="c-detalle">
        <img src="${personaje.imageUrl}" alt="${personaje.name}" height="200" width="auto">
        <h2>${personaje.name}</h2>
        <p><strong>Películas:</strong> ${peliculas}</p>
        <p><strong>Series:</strong> ${series}</p>
        <p><strong>Atracciones:</strong> ${atracciones}</p>
        <button onClick="toggleFavorito('${personaje._id}', '${personaje.name}', '${personaje.imageUrl}')">
            <span id="corazon-${personaje._id}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>`;
}
