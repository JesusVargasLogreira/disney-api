function Peliculas() {
  let todas = [];
  personajes.forEach(p => {
    if (p.films && p.films.length > 0) todas.push(...p.films);
  });

  let unicas = [...new Set(todas)];
  let listaHTML = "<h2>🎥 Películas</h2>";

  for (let i = 0; i < unicas.length; i++) {
    listaHTML += `<div class="c-item" onclick="VerPorPelicula('${unicas[i]}')">${unicas[i]}</div>`;
  }

  document.getElementById("root").innerHTML = listaHTML;
}

function VerPorPelicula(nombre) {
  const filtrados = personajes.filter(p =>
    p.films && p.films.includes(nombre)
  );
  const root = document.getElementById('root');
  root.innerHTML = '';
  const h = document.createElement('h2');
  h.textContent = `🎬 ${nombre}`;
  root.appendChild(h);

  if (!filtrados || filtrados.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No se encontraron personajes para esta película.';
    root.appendChild(p);
    return;
  }

  const contenedor = document.createElement('section');
  contenedor.id = 'la-lista';
  contenedor.classList.add('lista-cards');
  contenedor.innerHTML = generarLista(filtrados);
  root.appendChild(contenedor);
}
