function Parques() {
  let todas = [];
  personajes.forEach(p => {
    if (p.parkAttractions && p.parkAttractions.length > 0) todas.push(...p.parkAttractions);
  });

  let unicas = [...new Set(todas)];
  let listaHTML = "<h2>🏰 Parques y Atracciones</h2>";

  for (let i = 0; i < unicas.length; i++) {
    listaHTML += `<div class="c-item" onclick="VerPorParque('${unicas[i]}')">${unicas[i]}</div>`;
  }

  document.getElementById("root").innerHTML = listaHTML;
}

function VerPorParque(nombre) {
  const filtrados = personajes.filter(p =>
    p.parkAttractions && p.parkAttractions.includes(nombre)
  );
  const root = document.getElementById('root');
  root.innerHTML = '';
  const h = document.createElement('h2');
  h.textContent = `🏰 ${nombre}`;
  root.appendChild(h);

  if (!filtrados || filtrados.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No se encontraron personajes para esta atracción.';
    root.appendChild(p);
    return;
  }

  const contenedor = document.createElement('section');
  contenedor.id = 'la-lista';
  contenedor.classList.add('lista-cards');
  contenedor.innerHTML = generarLista(filtrados);
  root.appendChild(contenedor);
}
