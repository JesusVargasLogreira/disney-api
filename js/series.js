function Series() {
  let todas = [];
  personajes.forEach(p => {
    if (p.tvShows && p.tvShows.length > 0) todas.push(...p.tvShows);
  });

  let unicas = [...new Set(todas)];
  let listaHTML = "<h2>📺 Series</h2>";

  for (let i = 0; i < unicas.length; i++) {
    listaHTML += `<div class="c-item" onclick="VerPorSerie('${unicas[i]}')">${unicas[i]}</div>`;
  }

  document.getElementById("root").innerHTML = listaHTML;
}

function VerPorSerie(nombre) {
  const filtrados = personajes.filter(p =>
    p.tvShows && p.tvShows.includes(nombre)
  );
  const root = document.getElementById('root');
  root.innerHTML = '';
  const h = document.createElement('h2');
  h.textContent = `📺 ${nombre}`;
  root.appendChild(h);

  if (!filtrados || filtrados.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No se encontraron personajes para esta serie.';
    root.appendChild(p);
    return;
  }

  const contenedor = document.createElement('section');
  contenedor.id = 'la-lista';
  contenedor.classList.add('lista-cards');
  contenedor.innerHTML = generarLista(filtrados);
  root.appendChild(contenedor);
}
