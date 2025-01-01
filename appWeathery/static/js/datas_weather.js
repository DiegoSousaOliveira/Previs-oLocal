document.body.addEventListener("htmx:afterRequest", function (event) {
  if (event.detail.xhr.status !== 200) return;

  const data = JSON.parse(event.detail.xhr.responseText);

  const weatherContainer = document.querySelector("#weather-container");

  // Atualizar o conteúdo do clima
  weatherContainer.innerHTML = `
    <div class="card shadow-sm p-4">
      <h2 class="text-center text-primary">${data.weather_info.city} - ${data.weather_info.state}, ${data.weather_info.country}</h2>
      <div class="d-flex justify-content-center align-items-center my-3">
        <img src="https://openweathermap.org/img/wn/${data.weather_info.icon}@2x.png" alt="Ícone do tempo" class="me-3">
        <p class="fs-4 text-secondary">${data.weather_info.description}</p>
      </div>
      <table class="table table-striped">
        <tbody>
          <tr>
            <td><strong>Temperatura Atual:</strong></td>
            <td>${data.weather_info.temperature}°C</td>
          </tr>
          <tr>
            <td><strong>Temperatura Máxima:</strong></td>
            <td>${data.weather_info.temp_max}°C</td>
          </tr>
          <tr>
            <td><strong>Temperatura Mínima:</strong></td>
            <td>${data.weather_info.temp_min}°C</td>
          </tr>
          <tr>
            <td><strong>Humidade:</strong></td>
            <td>${data.weather_info.humidity}%</td>
          </tr>
          <tr>
            <td><strong>Pressão:</strong></td>
            <td>${data.weather_info.pressure} hPa</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
});
