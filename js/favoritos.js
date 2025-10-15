function Favoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length == 0) {
        document.getElementById("root").innerHTML = "<p>No hay favoritos</p>";
    } else {
        // Generar la lista de personajes favoritos
        let listaHTML = "";
        for (let i = 0; i < favoritos.length; i++) {
            listaHTML += `
                <div class="c-item" onclick="Personaje('${favoritos[i].id}')">
                    <img src="${favoritos[i].image}" alt="${favoritos[i].name}" height="120">
                    <p>${favoritos[i].name}</p>
                </div>
            `;
        }
        document.getElementById("root").innerHTML = listaHTML;
    }
}
