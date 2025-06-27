
const apiKey = "AIzaSyAcAoCT9_ec4pkV2nu6QtwyO8XBrN0vedM";

function initMap() {
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  const location = { lat: 29.9753, lng: 31.1376 }; // near Giza Pyramids

  const request = {
    location,
    radius: 1000,
    type: ['restaurant', 'lodging', 'store']
  };

  service.nearbySearch(request, (results, status) => {
    const container = document.getElementById("places-list");
    container.innerHTML = "";

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(place => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${place.name}</strong><br>${place.vicinity}<hr>`;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = "<p>Failed to load places.</p>";
    }
  });
}

window.onload = () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);
};
