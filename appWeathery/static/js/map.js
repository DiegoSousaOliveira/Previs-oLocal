// Inicializa o mapa com uma visão padrão
var map = L.map('map').setView([-14.2350, -51.9253], 4); // Coordenadas iniciais no Brasil
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Variável global para o marcador
var marker;

// Listener para eventos HTMX
document.body.addEventListener('htmx:afterRequest', function (event) {
    if (event.detail.xhr.status === 200) {
        const data = JSON.parse(event.detail.xhr.responseText);

        if (data.lat && data.lng) {
            // Atualiza o mapa com as coordenadas retornadas
            map.setView([data.lat, data.lng], 12);

            // Remove o marcador anterior, se existir
            if (marker) {
                map.removeLayer(marker);
            }

            // Adiciona um novo marcador no mapa
            marker = L.marker([data.lat, data.lng]).addTo(map)
                .bindPopup(`Localização: ${data.lat}, ${data.lng}`)
                .openPopup();
        } else {
            console.error('Erro: Coordenadas não encontradas.');
        }
    }
});
