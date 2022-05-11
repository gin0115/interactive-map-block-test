
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Button, TextControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

/** 
 * UUID's are used to identify the markers.
 */
import { v4 as uuidv4 } from 'uuid';


const Inspector = (props) => {

    const { attributes, setAttributes, getCurrentMaker } = props;
    const currentMarker = getCurrentMaker();
    const { markers } = attributes;

    /**
     * Adds a new marker to the map
     * 
     * @todo Add a marker to the map
     */
    const addMarker = () => {
        // If we have no markers, create a new array
        if (!markers) {
            markers = [];
        }

        let marker = { position: [51.505, -0.09], title: "HI", description: 'MOCKED', "key": uuidv4() };
        markers.push(marker);

        setAttributes({ markers: markers })
        console.log(attributes, markers);
    }

    const nullChangedHandler = (event) => {
        // const updatedKeyword = event.target.value;
        // May be call for search result
    }

    const findMarker = (key) => {
        return markers.findIndex(marker => marker.key === key);
    }

    /**
     * Renders the edit marker form
     * @param {string} key They key of the marker to edit
     * @returns Component to render
     */
    const editMarker = (key) => {
        console.log('edit marker', key);

        const markers = attributes.markers;
        const index = findMarker(key);

        const marker = markers[index];

        // if (index > -1) {
        //     markers[index] = marker;
        //     setAttributes({ markers: markers });
        // }

        return (
            <>
                <Fragment>
                    <div>
                        {/* <label>Title</label> */}
                        <TextControl
                            label="Title"
                            value={attributes.markers[index].title}
                            onChange={(e) => {
                                const updatedMarker = { ...marker, title: e };
                                markers[index] = updatedMarker;
                                setAttributes({ markers: markers });
                            }}
                            onInput={(e) => {
                                const updatedMarker = { ...marker, title: e };
                                markers[index] = updatedMarker;
                                setAttributes({ markers: markers });
                            }}
                        />
                    </div>
                    {/* <div>
                    <label>Description</label>
                    <input type="text" value={marker.description} />
                </div>
                <div>
                    <label>Latitude</label>
                    <input type="text" value={marker.position.lat} readOnly={true} />
                </div>
                <div>
                    <label>Longitude</label>
                    <input type="text" value={marker.position.lng} readOnly={true} />
                </div> */}
                </Fragment>
            </>
        );

        return <div>Edit, {JSON.stringify(marker)}</div>
    }

    /**
     * Renders the marker list
     * @returns Component to render
     */
    const listMakers = () => {
        if (markers) {
            return markers.map((marker, index) => {
                return <div key={uuidv4()} >{JSON.stringify(attributes.markers)}</div>
            })
        }
    }

    /**
     * Renders the marker details/list based on context.
     * @returns Component to render
     */
    const renderMarkerPanel = () => {
        return currentMarker ? editMarker(currentMarker.key) : listMakers();
    }


    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Markers', 'map-block-leaflet')} initialOpen>
                    <div>
                        <Button variant="primary" onClick={addMarker}>Add</Button>
                    </div>
                    {/* <p>{JSON.stringify(currentMarker)}</p> */}
                    {renderMarkerPanel()}
                    {/* <EditMarker marker={{ title: "hi" }} setAttributes={setAttributes} key="1" /> */}
                </PanelBody>
            </InspectorControls>
        </Fragment>
    )
}

export default Inspector