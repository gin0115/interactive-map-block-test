jQuery(document).ready(function() {
    "use strict";

    // https://leafletjs.com/reference.html#event-objects

    // Init the map, lat/long array and zoom level.

    var map = L.map('map').setView({ lon: -1.1990949511528017, lat: 53.03723308281756 }, 16);

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    // show the scale bar on the lower left corner
    L.control.scale({ imperial: true, metric: true }).addTo(map);

    // show a marker on the map
    L.marker({ lon: -1.1990949511528017, lat: 53.03723308281756 }).bindPopup('The center of the world').addTo(map);

    map.on('click', function(e) {
        var marker = new L.marker(e.latlng).addTo(map);
        console.log(marker);
    });

    console.log(map, 'BACK');

    // var map = L.map('map', {
    //     scrollWheelZoom: true
    // }).setView([37.248026, -119.5489465], 7);


    // // Add tile images from open street map. Set required attributation.
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    // console.log(map);

    // // Add each store onto the map.
    // jQuery('.wp-block-swami-select-store-locator-location').each(function() {

    //     let $this = jQuery(this),
    //         $latLong = $this.attr('data-lat-long').split(','),
    //         $options = {
    //             alt: $this.find('h5').text()
    //         };

    //     let title = $this.find('.store-inner > h5').text();
    //     if (title && title.length) {
    //         $options.title = title;
    //     }

    //     let marker = null;
    //     // Add the marker
    //     if (Array.isArray($latLong) && $latLong.length > 1) {
    //         marker = L.marker($latLong, $options).addTo(map).bindPopup(title);

    //         $this.on('mouseenter touchstart', function() {
    //             let $marker = jQuery('#map img[title="' + title + '"]');
    //             if ($marker.length) {
    //                 $marker.addClass('marker-active');
    //                 map.flyTo($latLong, 10);
    //                 setTimeout(() => {
    //                     $marker.removeClass('marker-active');
    //                 }, 5000);
    //             }
    //         });
    //     }

    // });

    // // Hover over store in list event.
    // jQuery('.wp-block-swami-select-store-locator-location').on('mouseenter touchstart', function() {

    //     let $this = jQuery(this),
    //         $title = $this.attr('data-title'),
    //         $marker = jQuery('#map img[alt="' + $title + '"]');

    //     $marker.addClass('marker-active');
    // });

    // // Exit hover event.
    // jQuery('.wp-block-swami-select-store-locator-location').on('mouseleave touchend', function() {
    //     jQuery('.marker-active').removeClass('marker-active');
    // });

});