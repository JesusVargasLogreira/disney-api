let preguntas = [];
let indiceActual = 0;
let puntaje = 0;
let tiempoRestante = 15;
let temporizador;
let triviaIniciada = false;

// Generar preguntas aleatorias usando DisneyAPI
async function cargarPreguntas() {
    const res = await fetch("https://api.disneyapi.dev/character?page=1&pageSize=50");
    const data = await res.json();

    // Generar preguntas tipo "¿Quién es este personaje?"
    preguntas = data.data
        .filter(p => p.imageUrl)
        .slice(0, 10)
        .map((p, i, arr) => {
            const opciones = [p.name];
            while (opciones.length < 4) {
                const random = arr[Math.floor(Math.random() * arr.length)];
                if (!opciones.includes(random.name)) opciones.push(random.name);
            }
            opciones.sort(() => Math.random() - 0.5);
            return { pregunta: "¿Quién es este personaje?", imagen: p.imageUrl, correcta: p.name, opciones };
        });

    indiceActual = 0;
    puntaje = 0;
    mostrarPregunta();
}

// Mostrar una pregunta
function mostrarPregunta() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <section class="c-trivia fade-in">
            <div class="trivia-header">
                <h2>Trivia Disney</h2>
                <div class="stats">
                    <span>Pregunta <strong>${indiceActual + 1}</strong>/10</span>
                    <span>Puntaje: <strong>${puntaje}</strong></span>
                </div>
            </div>
            <div class="controls">
                <div class="left">
                    <button class="btn small danger" onclick="reiniciarTrivia()">Reiniciar</button>
                </div>
                <div class="center">
                    <div class="timer">
                        <div class="barra-tiempo" id="barra-tiempo"></div>
                        <span id="texto-tiempo">${tiempoRestante}s</span>
                    </div>
                </div>
                <div class="right">
                    <button class="btn primary small" onclick="siguientePregunta()">Siguiente</button>
                </div>
            </div>

            <div id="trivia-contenido" class="fade-in">
                <p class="pregunta">${preguntas[indiceActual].pregunta}</p>
                <img src="${preguntas[indiceActual].imagen}" alt="Personaje Disney" class="imagen-trivia" />
                <div class="opciones">
                    ${preguntas[indiceActual].opciones
            .map(
                (op) =>
                    `<button class="btn-opcion" onclick="verificarRespuesta(this, '${op}')">${op}</button>`
            )
            .join("")}
                </div>
                <div id="resultado" class="resultado"></div>
            </div>
        </section>
    `;

    tiempoRestante = 15;
    actualizarBarraTiempo();
    clearInterval(temporizador);
    temporizador = setInterval(actualizarBarraTiempo, 1000);
}

// Control del tiempo visual
function actualizarBarraTiempo() {
    const barra = document.getElementById("barra-tiempo");
    const texto = document.getElementById("texto-tiempo");
    if (!barra || !texto) return;

    barra.style.width = (tiempoRestante / 15) * 100 + "%";
    texto.textContent = `${tiempoRestante}s`;

    if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        document.getElementById("resultado").textContent = "⏰ Tiempo agotado!";
        deshabilitarOpciones();
    }
    tiempoRestante--;
}

// Verificar respuesta seleccionada
function verificarRespuesta(btn, seleccionada) {
    const correcta = preguntas[indiceActual].correcta;
    clearInterval(temporizador);
    const opciones = document.querySelectorAll(".btn-opcion");

    opciones.forEach((b) => {
        b.disabled = true;
        if (b.textContent === correcta) b.classList.add("correct");
        else if (b === btn && seleccionada !== correcta) b.classList.add("wrong");
    });

    const resultado = document.getElementById("resultado");
    if (seleccionada === correcta) {
        resultado.textContent = "✅ ¡Correcto!";
        resultado.style.color = "var(--success)";
        puntaje++;
    } else {
        resultado.textContent = `❌ Incorrecto. Era ${correcta}.`;
        resultado.style.color = "var(--danger)";
    }
}

// Pasar a la siguiente pregunta
function siguientePregunta() {
    if (indiceActual < preguntas.length - 1) {
        indiceActual++;
        mostrarPregunta();
    } else {
        mostrarResultadoFinal();
    }
}

// Mostrar resultado final
function mostrarResultadoFinal() {
    clearInterval(temporizador);
    document.getElementById("root").innerHTML = `
        <section class="c-trivia fade-in">
            <h2>🎉 ¡Trivia completada!</h2>
            <p>Tu puntaje final: <strong>${puntaje} / ${preguntas.length}</strong></p>
            <button class="btn primary" onclick="reiniciarTrivia()">Jugar de nuevo</button>
        </section>
    `;
}

// Reiniciar trivia
function reiniciarTrivia() {
    clearInterval(temporizador);
    cargarPreguntas();
}

// Cargar automáticamente al abrir pestaña "Trivia"
function Trivia() {
    document.body.classList.add("modo-trivia");
    if (!triviaIniciada) {
        triviaIniciada = true;
        cargarPreguntas();
    } else {
        mostrarPregunta();
    }
}
