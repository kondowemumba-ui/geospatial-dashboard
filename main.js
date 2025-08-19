// Initialize the map, centered on a specific location and zoom level
var mymap = L.map('mapid').setView([40.7128, -74.0060], 13);

// Add a tile layer (the base map) from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(mymap);

// Fetch your GeoJSON data and add it to the map
fetch('data/your-data.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            // Function to run for each feature in the data
            onEachFeature: function (feature, layer) {
                // Check if the feature has properties and a name
                if (feature.properties && feature.properties.name) {
                    // Bind a popup to the feature
                    layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
                }
            }
        }).addTo(mymap);
    })
    .catch(error => console.error('Error loading the GeoJSON file:', error));
