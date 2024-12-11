// Inicialización del mapa con Leaflet.js
let map = L.map('map').setView([39.4762, -6.3700], 13); // Coordenadas de Cáceres

// Cargar un mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Puntos de patinetes en Cáceres (coordenadas ajustadas)
let puntosPatinetes = [
    { id: 1, lat: 39.4745, lon: -6.3705 }, // Centro de Cáceres
    { id: 2, lat: 39.4740, lon: -6.3690 }, // Otra ubicación en Cáceres
    { id: 3, lat: 39.4755, lon: -6.3710 },  // Otra ubicación en Cáceres
    { id: 4, lat: 39.4760, lon: -6.3720 },  // Otra ubicación en Cáceres
    { id: 5, lat: 39.4765, lon: -6.3730 }   // Otra ubicacion de Cáceres

];

// Función para generar un nivel de batería aleatorio entre 20 y 100
function obtenerBateriaAleatoria() {
    return Math.floor(Math.random() * 81) + 20; // Batería entre 20% y 100%
}

// Crear marcadores en el mapa para cada patinete
puntosPatinetes.forEach(patinete => {
    let marcador = L.marker([patinete.lat, patinete.lon]).addTo(map);
    
    marcador.on('click', function() {
        mostrarDetalles(patinete.id);
    });
});

// Mostrar detalles en el popup (tabla con patinetes y batería)
function mostrarDetalles(idPatinete) {
    let detalles = document.getElementById('details');
    let tableBody = document.getElementById('table-body');
    
    // Limpiar tabla
    tableBody.innerHTML = '';

    // Crear una tabla con los datos de patinetes y batería
    puntosPatinetes.forEach(patinete => {
        if (patinete.id === idPatinete) {
            let fila = document.createElement('tr');
            let celdaId = document.createElement('td');
            celdaId.textContent = `Patinete ${patinete.id}`;
            
            let celdaBateria = document.createElement('td');
            celdaBateria.textContent = `${obtenerBateriaAleatoria()}%`;
            
            fila.appendChild(celdaId);
            fila.appendChild(celdaBateria);
            tableBody.appendChild(fila);
        }
    });

    detalles.style.display = 'block';
}
