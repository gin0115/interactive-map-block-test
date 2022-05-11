/**
 * Retrieves the translation of text.
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import './editor.scss';

/** 
 * The Inspector component.
 */
import Inspector from "./inspector";

/**
 * All Leaflet components.
 */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

/** 
 * React hooks
 */
import { useState, useRef } from "@wordpress/element";

/** 
 * UUID's are used to identify the markers.
 */
import { v4 as uuidv4 } from 'uuid';

// @TODO Mock marker data.
const mockMarkers = [
    {
        "position": {
            "lat": 51.49570596538067,
            "lng": -0.13269424438476565
        },
        "title": "Marker 1",
        "key": uuidv4(),
        "description": "This is a marker"
    },
    {
        "position": {
            "lat": 51.52925135518991,
            "lng": -0.04171371459960938
        },
        "title": "Marker 2",
        "key": uuidv4(),
        "description": "This is a marker 2"
    },
    {
        "position": {
            "lat": 51.52775622697431,
            "lng": -0.14711380004882815
        },
        "title": "Marker 3",
        "key": uuidv4(),
        "description": "This is a marker 3"
    },
]

const center = {
    lat: 51.505,
    lng: -0.09,
}

/**
 * Denotes the current selected marker.
 */
let currentMaker = null;

/**
 * Renders an array of markers
 * @param {array} markers Array of Marker models
 * @returns array of Marker components
 */
const Markers = (markers) => markers.map((marker) => RenderDraggableMarker(marker));
/**
 * Renders a draggable marker.
 * @param {object} marker Marker model
 * @returns 
 */
const RenderDraggableMarker = (marker) => {

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(marker.position)
    const markerRef = useRef(null)

    /**
     * All event handlers for the Draggable Marker.
     */
    const eventHandlers = {
        dragend() {
            const activeMarker = markerRef.current
            if (activeMarker != null) {
                // Update the position of the marker.
                marker.position = activeMarker.getLatLng();
                setPosition(activeMarker.getLatLng())
            }
        },
    }

    /**
     * Handler for activating and deactivating the Draggable Marker.
     */
    const toggleDraggable = () => setDraggable((d) => {
        currentMaker = d ? null : marker;
        return !d;
    })

    return (
        <Marker
            key={marker.key}
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}

    

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.isSelected
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    /**
     * Gets the currently selected marker.
     * @returns {null|object} The current selected marker, return null if not.
     */
    const getCurrentMaker = () => {
        return currentMaker;
    }

    // @TODO Remove me (just adds 3 random markers)
    if (attributes.markers.length === 0) {
        attributes.markers = mockMarkers;
    }

    function redraw(){
        const [d, setD] = useState(false);
        setD(!d);
    }


    return (
        <>
            <Inspector {...{ attributes, setAttributes, "getCurrentMaker": getCurrentMaker, "redraw": redraw }} />
            <div {...useBlockProps()}>
                <div className="pinkcrab-map-wrapper">
                    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {Markers(attributes.markers)}
                    </MapContainer>,
                </div>

            </div>
        </>
    );
}