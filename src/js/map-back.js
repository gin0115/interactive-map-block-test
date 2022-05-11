// jQuery(document).ready(function() {
//     "use strict";
//     console.log('document ready');



//     console.log('laoded');
//     var map = L.map('map').setView({ lon: -1.1990949511528017, lat: 53.03723308281756 }, 16);

//     // add the OpenStreetMap tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
//     }).addTo(map);
//     // show the scale bar on the lower left corner
//     L.control.scale({ imperial: true, metric: true }).addTo(map);

//     // show a marker on the map
//     L.marker({ lon: -1.1990949511528017, lat: 53.03723308281756 }).bindPopup('The center of the world').addTo(map);

//     map.on('click', function(e) {
//         var marker = new L.marker(e.latlng).addTo(map);
//         console.log(marker);
//     });

//     // https://leafletjs.com/reference.html#event-objects

//     // Init the map, lat/long array and zoom level.




// });