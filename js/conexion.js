var totalChars = 9820;
var personajes = [];

async function Conexion() {
  const res = await fetch(`https://api.disneyapi.dev/character?pageSize=${totalChars}`);
  const data = await res.json();
  return data.data;
}

async function General() {
  if (personajes.length === 0) {
    personajes = await Conexion();
  }
  Home();
}
